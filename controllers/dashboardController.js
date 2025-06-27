// controllers/dashboardController.js
const db = require('../config/db');

exports.showDashboard = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/?error=' + encodeURIComponent('Silakan login terlebih dahulu.'));
  }

  try {
    // 1. Ambil data user
    const user = await db.user.findByPk(req.session.userId);
    if (!user) {
      return res.redirect('/?error=' + encodeURIComponent('Pengguna tidak ditemukan.'));
    }

    // 2. Ambil semua modul
    const modules = await db.modules.findAll({
      attributes: ['id', 'title'],
      order: [['id', 'ASC']]
    });

    // 3. Ambil semua quiz dan relasinya
    const quizzes = await db.quiz.findAll({
      attributes: ['id', 'module_id']
    });

    const quizRelasi = await db.user_quiz_relasi.findAll({
      where: { user_id: user.id },
      attributes: ['quiz_id', 'status']
    });

    // 4. Ambil user_module_progress
    const moduleProgresses = await db.user_module_progress.findAll({
      where: { user_id: user.id },
      attributes: ['module_id', 'status']
    });

    // 5. Buat peta status modul
    const modStatusMap = {};
    moduleProgresses.forEach(p => {
      modStatusMap[p.module_id] = p.status;
    });

    // 6. Buat peta quiz per modul
    const quizPerModule = {};
    quizzes.forEach(q => {
      if (!quizPerModule[q.module_id]) quizPerModule[q.module_id] = [];
      quizPerModule[q.module_id].push(q.id);
    });

    // 7. Buat peta status quiz
    const quizStatusMap = {};
    quizRelasi.forEach(rel => {
      quizStatusMap[rel.quiz_id] = rel.status;
    });

    // 8. Final status map per modul:
    const statusMap = {};
    modules.forEach(mod => {
      const modStatus = modStatusMap[mod.id];
      const quizIds = quizPerModule[mod.id] || [];

      // Ambil status quiz yang relevan
      const quizStatuses = quizIds.map(qid => quizStatusMap[qid]).filter(Boolean);

      // Logic prioritas status
      if (modStatus === 'completed' || quizStatuses.includes('completed')) {
        statusMap[mod.id] = 'completed';
      } else if (modStatus === 'in_progress' || quizStatuses.includes('in_progress')) {
        statusMap[mod.id] = 'in_progress';
      } else {
        statusMap[mod.id] = 'not_started';
      }
    });

    // 9. Render dashboard
    res.render('dashboard', {
      user,
      modules,
      statusMap,
      quizStatusMap
    });

  } catch (err) {
    console.error("‼ Error loading dashboard:", err);
    res.redirect('/?error=' + encodeURIComponent('Terjadi kesalahan saat memuat dashboard.'));
  }
};
