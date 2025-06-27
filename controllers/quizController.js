const db = require('../config/db');

exports.showListQuiz = async (req, res) => {
    try {
        const quizzes = await db.quiz.findAll({
            attributes: ['id'],
            include: [{
                model: db.modules,
                as: 'module',              // ⚠️ alias "module"
                attributes: ['title', 'image_video_url']
            }],
            order: [['id', 'ASC']]
        });
        res.render('user/quiz/list-quiz', { quizzes });
    } catch (err) {
        console.error('Gagal mengambil data quiz:', err);
        res.status(500).send('Error mengambil daftar quiz.');
    }
};

exports.showQuiz = async (req, res) => {
    const userId = req.user.id;
    const quizId = parseInt(req.params.id, 10);

    try {
        // 1) Tandai sebagai in_progress jika baru pertama kali atau sebelumnya not_started
        const [rel, created] = await db.user_quiz_relasi.findOrCreate({
            where: { user_id: userId, quiz_id: quizId },
            defaults: { status: 'in_progress' }
        });
        if (!created && rel.status === 'not_started') {
            rel.status = 'in_progress';
            await rel.save();
        }

        // 2) Render halaman quiz (EJS terpisah per-ID)
        const viewName = `user/quiz/quiz${quizId}`;
        return res.render(viewName);
    } catch (err) {
        console.error('Gagal load quiz:', err);
        return res.status(500).send('Error memulai quiz.');
    }
};

exports.completeQuiz = async (req, res) => {
    const userId = req.user.id;
    const quizId = parseInt(req.params.id, 10);

    try {
        const [rel, created] = await db.user_quiz_relasi.findOrCreate({
            where: { user_id: userId, quiz_id: quizId },
            defaults: { status: 'completed', completed_at: new Date() }
        });
        if (!created) {
            rel.status = 'completed';
            rel.completed_at = new Date();
            await rel.save();
        }
        return res.redirect(`/quiz/${quizId}`);
    } catch (err) {
        console.error('Gagal menyimpan progress:', err);
        return res.status(500).send('Error menyimpan progress.');
    }
};