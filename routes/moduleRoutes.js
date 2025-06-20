const express = require('express');
const { showListModule, showModule1,showModule2, showModule3, showModule5, showModule4, showModule6 } = require('../controllers/moduleController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/list-module', authMiddleware, showListModule);
router.get('/module1', authMiddleware, showModule1);
router.get('/module2', authMiddleware, showModule2);
router.get('/module3', authMiddleware, showModule3);
router.get('/module4', authMiddleware, showModule4);
router.get('/module5', authMiddleware, showModule5);
router.get('/module6', authMiddleware, showModule6);

module.exports = router;