// routes/authRoutes.js (Ini akan menangani POST dari form)
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// // Route untuk registrasi (form POST ke sini)
// router.post('/register', authController.register);

// // Route untuk login (form POST ke sini)
// router.post('/login', authController.login);

router.get('/register', (req, res) => {
    res.render('register', { error: req.query.error });
  });
  
  router.post('/register', authController.register);
  router.post('/login', authController.login);
  router.post('/logout', authController.logout);
  
module.exports = router;