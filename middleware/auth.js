// middleware/auth.js
// Tidak perlu jwt lagi
// const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../config/db');

module.exports = async function (req, res, next) {
    // Periksa apakah ID pengguna ada di sesi
    if (!req.session || !req.session.userId) { // <--- PERUBAHAN DI SINI
        return res.redirect('/?error=' + encodeURIComponent('Login diperlukan untuk mengakses halaman ini.'));
    }

    try {
        // Ambil detail pengguna dari database berdasarkan ID di sesi
        const user = await db.user.findByPk(req.session.userId, { // <--- PERUBAHAN DI SINI
            attributes: ['id', 'username', 'email', 'role', 'photo'] // Ambil data yang diperlukan
        });

        if (!user) {
            // Jika user tidak ditemukan di DB (mungkin sudah dihapus), hancurkan sesi
            req.session.destroy(err => {
                if (err) console.error('Error destroying session:', err);
                return res.redirect('/?error=' + encodeURIComponent('Pengguna tidak ditemukan atau sesi tidak valid.'));
            });
            return; // Penting untuk menghentikan eksekusi lebih lanjut
        }

        req.user = user.toJSON(); // Lampirkan objek user ke request
        next(); // Lanjutkan ke route handler
    } catch (err) {
        console.error(err.message);
        // Hancurkan sesi jika ada kesalahan dalam pengambilan user
        req.session.destroy(err => {
            if (err) console.error('Error destroying session:', err);
            return res.redirect('/?error=' + encodeURIComponent('Sesi Anda tidak valid. Silakan login kembali.'));
        });
    }
};