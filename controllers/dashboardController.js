const db = require("../config/db");

exports.showDashboard = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect(
      "/?error=" + encodeURIComponent("Silakan login terlebih dahulu.")
    );
  }

  try {
    const user = await db.user.findByPk(req.session.userId);
    if (!user) {
      return res.redirect(
        "/?error=" + encodeURIComponent("Pengguna tidak ditemukan.")
      );
    }

    const modules = await db.modules.findAll({
      attributes: ["id", "title"],
      order: [["id", "ASC"]],
    });

    const quizzes = await db.quiz.findAll({ attributes: ["id", "module_id"] });
    const quizRelasi = await db.user_quiz_relasi.findAll({
      where: { user_id: user.id },
      attributes: ["quiz_id", "status"],
    });

    const moduleProgresses = await db.user_module_progress.findAll({
      where: { user_id: user.id },
      attributes: ["module_id", "status"],
    });

    // Map status modul
    const modStatusMap = {};
    moduleProgresses.forEach((p) => {
      modStatusMap[p.module_id] = p.status;
    });

    // Map quiz per modul
    const quizPerModule = {};
    quizzes.forEach((q) => {
      if (!quizPerModule[q.module_id]) quizPerModule[q.module_id] = [];
      quizPerModule[q.module_id].push(q.id);
    });

    // Map status quiz
    const quizStatusMap = {};
    quizRelasi.forEach((rel) => {
      quizStatusMap[rel.quiz_id] = rel.status;
    });

    // Map status tantangan (tantangan_id = module_id)
    const tantanganRelasi = await db.user_tantangan_relasi.findAll({
      where: { user_id: user.id },
    });
    const tantanganStatusMap = {};
    tantanganRelasi.forEach((rel) => {
      tantanganStatusMap[rel.tantangan_id] = rel.status; // status: 'completed', dst
    });

    // Hitung progress per modul
    const progressMap = {};
    modules.forEach((mod) => {
      const modDone = modStatusMap[mod.id] === "completed";

      // Ambil quiz pertama pada modul (atau sesuaikan logika jika lebih dari satu quiz)
      const quizIds = quizPerModule[mod.id] || [];
      const firstQuizId = quizIds[0];
      const quizDone = firstQuizId
        ? quizStatusMap[firstQuizId] === "completed"
        : false;

      // Status tantangan (tantangan_id == mod.id)
      const chalDone = tantanganStatusMap[mod.id] === "completed";

      // Progress: 3 langkah (modul, quiz, tantangan)
      let steps = 0;
      if (modDone) steps++;
      if (quizDone) steps++;
      if (chalDone) steps++;

      progressMap[mod.id] = {
        modDone,
        quizDone,
        chalDone,
        percent: ((steps / 3) * 100).toFixed(0) + "%",
      };
    });

    res.render("dashboard", {
      user,
      modules,
      progressMap,
      badgeTitle: req.session.badgeTitle,
      totalPoint: req.session.totalPoint,
    });
  } catch (err) {
    console.error("‼ Error loading dashboard:", err);
    res.redirect(
      "/?error=" +
        encodeURIComponent("Terjadi kesalahan saat memuat dashboard.")
    );
  }
};
