const db = require('../config/db');

exports.showDashboard = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/?error=' + encodeURIComponent('Silakan login terlebih dahulu.'));
  }

  try {
    const user = await db.user.findByPk(req.session.userId);
    if (!user) {
      return res.redirect('/?error=' + encodeURIComponent('Pengguna tidak ditemukan.'));
    }

    console.log(`→ Dashboard accessed by userId: ${user.id}`);
    res.render('dashboard', { user });

  } catch (err) {
    console.error("‼ Error loading dashboard:", err);
    res.redirect('/?error=' + encodeURIComponent('Terjadi kesalahan saat memuat dashboard.'));
  }
};