const db = require('../config/db');

exports.showListQuiz = async (req, res) => {
    try {
        const quiz = await db.quiz.findAll({
            attributes: ['id', 'module_id']
        });

        res.render('user/quiz/list-quiz', { quiz });
    } catch (error) {
        console.error('Gagal mengambil data quiz: ', error);
        res.status(500).send('Terjadi Kesalahan saat mengambil data quiz.');
    }
};

exports.showQuiz1 = async (req, res) => {
    try {
        const quiz = await db.quiz.findAll({
            attributes: ['id', 'module_id']
        });

        res.render('user/quiz/quiz1', { quiz });
    } catch (error) {
        console.error('Gagal mengambil data quiz: ', error);
        res.status(500).send('Terjadi Kesalahan saat mengambil data quiz.');
    }
};

exports.showQuiz2 = async (req, res) => {
    try {
        const quiz = await db.quiz.findAll({
            attributes: ['id', 'module_id']
        });

        res.render('user/quiz/quiz2', { quiz });
    } catch (error) {
        console.error('Gagal mengambil data quiz: ', error);
        res.status(500).send('Terjadi Kesalahan saat mengambil data quiz.');
    }
};

exports.showQuiz3 = async (req, res) => {
    try {
        const quiz = await db.quiz.findAll({
            attributes: ['id', 'module_id']
        });

        res.render('user/quiz/quiz3', { quiz });
    } catch (error) {
        console.error('Gagal mengambil data quiz: ', error);
        res.status(500).send('Terjadi Kesalahan saat mengambil data quiz.');
    }
};

exports.showQuiz4 = async (req, res) => {
    try {
        const quiz = await db.quiz.findAll({
            attributes: ['id', 'module_id']
        });

        res.render('user/quiz/quiz4', { quiz });
    } catch (error) {
        console.error('Gagal mengambil data quiz: ', error);
        res.status(500).send('Terjadi Kesalahan saat mengambil data quiz.');
    }
};

exports.showQuiz5 = async (req, res) => {
    try {
        const quiz = await db.quiz.findAll({
            attributes: ['id', 'module_id']
        });

        res.render('user/quiz/quiz5', { quiz });
    } catch (error) {
        console.error('Gagal mengambil data quiz: ', error);
        res.status(500).send('Terjadi Kesalahan saat mengambil data quiz.');
    }
};

exports.showQuiz6 = async (req, res) => {
    try {
        const quiz = await db.quiz.findAll({
            attributes: ['id', 'module_id']
        });

        res.render('user/quiz/quiz6', { quiz });
    } catch (error) {
        console.error('Gagal mengambil data quiz: ', error);
        res.status(500).send('Terjadi Kesalahan saat mengambil data quiz.');
    }
};