const express = require('express');
const authMiddleware = require('../middleware/auth');
const { showListTantangan, showTantangan1, showTantangan2, showTantangan3, showTantangan4, showTantangan5, showTantangan6 } = require('../controllers/tantanganController');
const router = express.Router();

router.get('/list-tantangan', authMiddleware, showListTantangan);
router.get('/tantangan1', authMiddleware, showTantangan1);
router.get('/tantangan2', authMiddleware, showTantangan2);
router.get('/tantangan3', authMiddleware, showTantangan3);
router.get('/tantangan4', authMiddleware, showTantangan4);
router.get('/tantangan5', authMiddleware, showTantangan5);
router.get('/tantangan6', authMiddleware, showTantangan6);

module.exports = router;