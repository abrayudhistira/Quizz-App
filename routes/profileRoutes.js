const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/auth');
const profileController = require('../controllers/profileController');

router.get('/edit', authMiddleware, profileController.editPage);
router.post('/update', authMiddleware, upload.single('photo'), profileController.updateProfile);

module.exports = router;