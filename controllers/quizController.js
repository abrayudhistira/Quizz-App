const db = require("../config/db");

exports.showListQuiz = async (req, res) => {
  try {
    const quizzes = await db.quiz.findAll({
      attributes: ["id"],
      include: [
        {
          model: db.modules,
          as: "module",
          attributes: ["id", "title", "image_video_url"],
        },
      ],
      order: [["id", "ASC"]],
    });

    const progress = await db.user_module_progress.findAll({
      where: { user_id: req.user.id },
      attributes: ["module_id", "status"],
    });

    const moduleStatusMap = {};
    progress.forEach((p) => {
      moduleStatusMap[p.module_id] = p.status;
    });

    res.render("user/quiz/list-quiz", {
      quizzes,
      moduleStatusMap,
    });
  } catch (err) {
    console.error("Gagal mengambil data quiz:", err);
    res.status(500).send("Error mengambil daftar quiz.");
  }
};

exports.showQuiz = async (req, res) => {
  const userId = req.user.id;
  const quizId = parseInt(req.params.id, 10);

  try {
    const quiz = await db.quiz.findByPk(quizId, {
      include: [
        {
          model: db.modules,
          as: "module",
          attributes: ["id"],
        },
      ],
    });

    if (!quiz || !quiz.module) {
      return res.status(404).send("Quiz atau modul tidak ditemukan.");
    }

    const moduleId = quiz.module.id;

    const modulProgress = await db.user_module_progress.findOne({
      where: { user_id: userId, module_id: moduleId },
    });

    if (!modulProgress || modulProgress.status !== "completed") {
      return res
        .status(403)
        .send("Anda harus menyelesaikan modul terlebih dahulu.");
    }

    if (moduleId > 1) {
      const previousModulProgress = await db.user_module_progress.findOne({
        where: {
          user_id: userId,
          module_id: moduleId - 1,
          status: "completed",
        },
      });

      if (!previousModulProgress) {
        return res
          .status(403)
          .send("Selesaikan modul sebelumnya sebelum lanjut.");
      }
    }

    // Pastikan status quiz diubah ke in_progress
    const [rel, created] = await db.user_quiz_relasi.findOrCreate({
      where: { user_id: userId, quiz_id: quizId },
      defaults: { status: "in_progress" },
    });

    if (!created && rel.status === "not_started") {
      rel.status = "in_progress";
      await rel.save();
    }

    const viewName = `user/quiz/quiz${quizId}`;
    return res.render(viewName);
  } catch (err) {
    console.error("Gagal load quiz:", err);
    return res.status(500).send("Error memulai quiz.");
  }
};

exports.completeQuiz = async (req, res) => {
  const userId = req.user.id;
  const quizId = parseInt(req.params.id, 10);

  try {
    // Temukan atau buat relasi quiz
    const [rel] = await db.user_quiz_relasi.findOrCreate({
      where: { user_id: userId, quiz_id: quizId },
      defaults: { status: "in_progress" }, // Default jika belum ada
    });

    // Pastikan untuk mengubah status ke 'completed'
    rel.status = "completed";
    await rel.save();

    // Jika request dari fetch/ajax, balas JSON
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.json({ success: true });
    }

    // Jika request biasa, redirect
    return res.redirect(`/quiz/${quizId}`);
  } catch (err) {
    console.error("Gagal menyimpan progress:", err);
    return res.status(500).json({ success: false, message: "Error menyimpan progress." });
  }
};
