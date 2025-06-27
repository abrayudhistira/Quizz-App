// routes/quizRoute.js
const express        = require('express');
const authMiddleware = require('../middleware/auth');
const { showListQuiz, showQuiz, completeQuiz } = require('../controllers/quizController');

const router = express.Router();

router.get('/list-quiz',            authMiddleware, showListQuiz);
router.get('/quiz/:id',             authMiddleware, showQuiz);
router.post('/quiz/:id/complete',   authMiddleware, completeQuiz);

module.exports = router;