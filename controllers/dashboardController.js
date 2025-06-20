// controllers/dashboardController.js

// Fungsi untuk menampilkan dashboard
exports.getDashboard = (req, res) => {
    // req.user sudah diisi oleh authMiddleware
    res.render('dashboard', { user: req.user });
};