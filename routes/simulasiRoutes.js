const express = require('express');
const authMiddleware = require('../middleware/auth');
const { showSimulasi } = require('../controllers/simulasiController');
const router = express.Router();

router.get('/simulasi', authMiddleware, showSimulasi);

module.exports = router;