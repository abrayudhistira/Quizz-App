// app.js
const express = require('express');
const bodyParser = require('body-parser');   // ← fixed typo here
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// --- Impor Koneksi Database ---
const db = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// --- Konfigurasi EJS ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Middleware Global ---
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// --- Route Tampilan (GET) ---
app.get('/', (req, res) => {
  res.render('login', {
    error: req.query.error,
    message: req.query.message
  });
});

app.get('/register', (req, res) => {
  res.render('register', { error: req.query.error });
});

// --- Route Pemrosesan Form (POST) ---
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.user.findOne({ where: { email, password } });
    if (user) {
      res.redirect('/dashboard');
    } else {
      res.redirect('/?error=' + encodeURIComponent('Email atau password salah (tanpa keamanan).'));
    }
  } catch (err) {
    console.error('Error dummy login:', err.message);
    res.redirect('/?error=' + encodeURIComponent('Kesalahan server dummy login.'));
  }
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await db.user.findOne({ where: { email } });
    if (existingUser) {
      return res.redirect('/register?error=' + encodeURIComponent('Pengguna sudah terdaftar.'));
    }
    await db.user.create({ username, email, password });
    res.redirect('/?message=' + encodeURIComponent('Registrasi berhasil.'));
  } catch (err) {
    console.error('Error dummy register:', err.message);
    res.redirect('/register?error=' + encodeURIComponent('Kesalahan server dummy register.'));
  }
});

app.get('/dashboard', async (req, res) => {
  let user = { id: 'N/A', username: 'Tamu (Tanpa Login)', email: 'unknown@example.com', role: 'guest' };
  try {
    const firstUser = await db.user.findOne();
    if (firstUser) user = firstUser.toJSON();
  } catch (err) {
    console.error('Error fetching user for dashboard:', err.message);
  }
  res.render('dashboard', { user });
});

app.post('/logout', (req, res) => {
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;

db.connectAndSync()
  .then(() => {
    app.listen(PORT, async () => {
      const url = `http://localhost:${PORT}`;
      console.log(`Server berjalan di ${url}`);
      try {
        const openModule = (await import('open')).default;
        openModule(url);
      } catch (openError) {
        console.error('Gagal membuka browser otomatis:', openError.message);
        console.log('Silakan buka browser Anda secara manual ke:', url);
      }
    });
  })
  .catch(error => {
    console.error('Gagal memulai aplikasi karena kesalahan database:', error);
    process.exit(1);
  });

process.on('SIGINT', async () => {
  console.log('Menutup server...');
  try {
    await db.sequelize.close();
    console.log('Koneksi database ditutup.');
  } catch (error) {
    console.error('Kesalahan saat menutup koneksi database:', error);
  } finally {
    process.exit(0);
  }
});
