// controllers/authController.js
const bcrypt = require('bcryptjs');
const db = require('../config/db'); // Mengimpor objek db yang sudah terhubung
const user_tantangan_relasi = require('../models/user_tantangan_relasi');
const user_module_progress = require('../models/user_module_progress');
const user_quiz_relasi = require('../models/user_quiz_relasi');

// Fungsi untuk proses registrasi
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.redirect('/register?error=' + encodeURIComponent('Harap masukkan semua kolom'));
    }

    try {
        let user = await db.user.findOne({ where: { email } });
        if (user) {
            return res.redirect('/register?error=' + encodeURIComponent('Pengguna dengan email tersebut sudah ada'));
        }

        // Ambil nilai salt round dari environment, default ke 10 jika tidak diatur
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUND);
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await db.user.create({
            username,
            email,
            password: hashedPassword,
        });

        console.log(`User registered: ${user.username} (ID: ${user.id})`);

        res.redirect('/?message=' + encodeURIComponent('Registrasi berhasil. Silakan masuk.'));
    } catch (err) {
        console.error("Error saat registrasi:", err.message);
        res.redirect('/register?error=' + encodeURIComponent('Kesalahan server saat pendaftaran.'));
    }
};

// Fungsi untuk proses login
exports.login = async (req, res) => {
    const { username, password } = req.body;
    
    console.log(`→ Request: [POST] /login — Login attempt for username: ${username}`);
  
    if (!username || !password) {
      console.log(`← Response: [302] POST /login — Missing fields`);
      return res.redirect('/?error=' + encodeURIComponent('Harap masukkan semua kolom'));
    }
  
    try {
      const user = await db.user.findOne({ where: { username } });
      if (!user) {
        console.log(`← Response: [302] POST /login — Username tidak ditemukan: ${username}`);
        return res.redirect('/?error=' + encodeURIComponent('Kredensial tidak valid'));
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log(`← Response: [302] POST /login — Password salah untuk user ID ${user.id}`);
        return res.redirect('/?error=' + encodeURIComponent('Kredensial tidak valid'));
      }

      const userModule = await db.user_module_progress.findOne({ where: { user_id: user.id } });
        const userTantangan = await db.user_tantangan_relasi.findOne({ where: { user_id: user.id } });
        const userQuiz = await db.user_quiz_relasi.findOne({ where: { user_id: user.id } });
  
      req.session.userId = user.id;
      req.session.role = user.role;
      req.session.photo = user.photo;
      req.session.statusModule = userModule?.status || 'not_started';
      req.session.statusTantangan = userTantangan?.status || 'not_started';
      req.session.statusQuiz = userQuiz?.status || 'not_started';
      console.log(`→ Session set: userId = ${user.id}, role = ${user.role}`);
      console.log(`← Response: [302] POST /login — Access Granted redirect /dashboard for user ID ${user.id}`);
      console.log(`${req.session.statusModule}, ${req.session.statusTantangan}, ${req.session.statusQuiz}`);
      return res.redirect('/dashboard');
  
    } catch (err) {
      console.error(`‼ Error during login for username ${username}:`, err);
      console.log(`← Response: [302] POST /login — Redirecting due to server error`);
      return res.redirect('/?error=' + encodeURIComponent('Kesalahan server saat login.'));
    }
  };
  
  
  exports.logout = (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Gagal logout:', err);
        return res.redirect('/dashboard'); // Tetap di dashboard jika gagal logout
      }
  
      res.clearCookie('connect.sid'); // Opsional: bersihkan cookie session
      res.redirect('/?message=' + encodeURIComponent('Anda telah logout.'));
    });
  };