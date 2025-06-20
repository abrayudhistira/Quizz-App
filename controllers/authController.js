// controllers/authController.js
const bcrypt = require('bcryptjs');
const db = require('../config/db'); // Mengimpor objek db yang sudah terhubung

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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await db.user.create({
            username,
            email,
            password: hashedPassword,
        });

        res.redirect('/?message=' + encodeURIComponent('Registrasi berhasil. Silakan masuk.'));

    } catch (err) {
        console.error(err.message);
        res.redirect('/register?error=' + encodeURIComponent('Kesalahan server saat pendaftaran.'));
    }
};

// Fungsi untuk proses login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.redirect('/?error=' + encodeURIComponent('Harap masukkan semua kolom'));
    }

    try {
        let user = await db.user.findOne({ where: { email } });
        if (!user) {
            return res.redirect('/?error=' + encodeURIComponent('Kredensial tidak valid'));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.redirect('/?error=' + encodeURIComponent('Kredensial tidak valid'));
        }

        // --- PENTING: Menyimpan ID Pengguna di Sesi ---
        req.session.userId = user.id; // Menyimpan ID user di sesi
        req.session.role = user.role; // Menyimpan role user di sesi (opsional, tapi berguna)

        res.redirect('/dashboard'); // Redirect langsung ke dashboard

    } catch (err) {
        console.error(err.message);
        res.redirect('/?error=' + encodeURIComponent('Kesalahan server saat login.'));
    }
};