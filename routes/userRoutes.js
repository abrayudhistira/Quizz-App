const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `user_${req.user.id}_${Date.now()}.${ext}`);
  }
});
const upload = multer({ storage });

// Controller profile (buat file controllers/profileController.js)
const profileController = require('../controllers/userController');

router.get('/profile/edit', authMiddleware, profileController.editProfileForm);
router.post('/profile/update', authMiddleware, upload.single('photo'), profileController.updateProfile);

// Route profile
router.get('/profile', authMiddleware, profileController.showProfile);

module.exports = router;