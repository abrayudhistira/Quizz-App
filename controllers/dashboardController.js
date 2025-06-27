// controllers/dashboardController.js
const db = require('../config/db');

exports.showDashboard = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/?error=' + encodeURIComponent('Silakan login terlebih dahulu.'));
  }

  try {
    // 1) Ambil data user
    const user = await db.user.findByPk(req.session.userId);
    if (!user) {
      return res.redirect('/?error=' + encodeURIComponent('Pengguna tidak ditemukan.'));
    }

    console.log(`→ Dashboard accessed by userId: ${user.id}`);

    // 2) Ambil semua modul, diurutkan berdasarkan id
    const modules = await db.modules.findAll({
      attributes: ['id', 'title'],
      order: [['id', 'ASC']]
    });

    // 3) Ambil progress user untuk semua modul
    const progresses = await db.user_module_progress.findAll({
      where: { user_id: user.id },
      attributes: ['module_id', 'status']
    });

    // 4) Map module_id → status
    const statusMap = {};
    progresses.forEach(p => {
      statusMap[p.module_id] = p.status;
    });

    // 5) Render view, kirim user, modules, dan statusMap
    res.render('dashboard', { user, modules, statusMap });

  } catch (err) {
    console.error("‼ Error loading dashboard:", err);
    res.redirect('/?error=' + encodeURIComponent('Terjadi kesalahan saat memuat dashboard.'));
  }
};