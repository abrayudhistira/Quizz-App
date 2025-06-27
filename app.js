// app.js
const express       = require('express');
const bodyParser    = require('body-parser');
const path          = require('path');
const session       = require('express-session');
const dotenv        = require('dotenv');
const db            = require('./config/db');

dotenv.config();

const authRoutes     = require('./routes/authRoutes');
const dashboardRoutes= require('./routes/dashboardRoutes');
const moduleRoutes   = require('./routes/moduleRoutes');
const quizRoutes     = require('./routes/quizRoute');
const simulasiRoutes = require('./routes/simulasiRoutes');
const tantanganRoutes= require('./routes/tantanganRoutes');
const userRoutes     = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 2 }
}));

// Logger
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`→ Request: [${req.method}] ${req.originalUrl}`);
  res.on('finish', () => {
    console.log(`← Response: [${res.statusCode}] ${req.method} ${req.originalUrl} (${Date.now() - start}ms)`);
  });
  next();
});

// Routes
app.use('/',     authRoutes, moduleRoutes, quizRoutes, simulasiRoutes, tantanganRoutes, userRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/uploads', express.static('uploads'));

// Root
app.get('/', (req, res) => {
  res.render('login', {
    error:   req.query.error,
    message: req.query.message
  });
});

// Start server
db.connectAndSync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Gagal memulai aplikasi:', err);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Menutup server...');
  try { await db.sequelize.close(); }
  catch (e) { console.error(e); }
  process.exit(0);
});
