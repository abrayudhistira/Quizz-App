// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // Middleware tetap diimpor di sini
const dashboardController = require('../controllers/dashboardController'); // <--- TAMBAHKAN BARIS INI

// Route untuk menampilkan dashboard
router.get('/', authMiddleware, dashboardController.getDashboard); // Menggunakan controller

module.exports = router;