const express = require('express');
const authMiddleware = require('../middleware/auth');
const { showListQuiz, showQuiz1, showQuiz2, showQuiz3, showQuiz4, showQuiz5, showQuiz6 } = require('../controllers/quizController');
const router = express.Router();

router.get('/list-quiz', authMiddleware, showListQuiz);
router.get('/quiz1', authMiddleware, showQuiz1);
router.get('/quiz2', authMiddleware, showQuiz2);
router.get('/quiz3', authMiddleware, showQuiz3);
router.get('/quiz4', authMiddleware, showQuiz4);
router.get('/quiz5', authMiddleware, showQuiz5);
router.get('/quiz6', authMiddleware, showQuiz6);

module.exports = router;