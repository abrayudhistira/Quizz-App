const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const db = require('./config/db');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const profileRoutes = require('./routes/profileRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const quizRoutes = require('./routes/quizRoute');
const simulasiRoutes = require('./routes/simulasiRoutes');
const tantanganRoutes = require('./routes/tantanganRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// --- View Engine ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Middleware ---
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 2 } // 2 jam
}));

// --- Logger Middleware ---
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`→ Request: [${req.method}] ${req.originalUrl}`);
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`← Response: [${res.statusCode}] ${req.method} ${req.originalUrl} (${duration}ms)`);
  });
  next();
});

// --- Routes ---
app.use('/', authRoutes,moduleRoutes, quizRoutes, simulasiRoutes, tantanganRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/profile', profileRoutes);
app.use('/uploads', express.static('uploads'));

// --- Root Route ---
app.get('/', (req, res) => {
  res.render('login', {
    error: req.query.error,
    message: req.query.message
  });
});

// Contoh di app.js
app.get('/profile', (req, res) => {
  // Ganti data di bawah sesuai kebutuhan dan struktur user kamu
  res.render('Profile', {
    bannerUrl: '/img/banner-default.jpg', // atau sesuai data user
    avatarUrl: req.user ? req.user.photo : '/img/default-avatar.jpg',
    name: req.user ? req.user.name : 'Guest',
    points: req.user ? req.user.points : 0,
    title: req.user ? req.user.title : 'Newbie',
    progress: req.user ? req.user.progress : { module: '0%', quiz: '0%', challenge: '0%' },
    badges: req.user ? req.user.badges : []
  });
});


// --- Start App ---
db.connectAndSync()
  .then(() => {
    app.listen(PORT, async () => {
      const url = `http://localhost:${PORT}`;
      console.log(`Server berjalan di ${url}`);
      // try {
      //   const openModule = (await import('open')).default;
      //   openModule(url);
      // } catch (err) {
      //   console.error('Gagal membuka browser otomatis:', err.message);
      //   console.log('Silakan buka browser Anda secara manual ke:', url);
      // }
    });
  })
  .catch(error => {
    console.error('Gagal memulai aplikasi karena kesalahan database:', error);
    process.exit(1);
  });

// --- Graceful Shutdown ---
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
