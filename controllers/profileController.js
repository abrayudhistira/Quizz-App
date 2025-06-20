const db = require('../config/db');
const path = require('path');

exports.editPage = (req, res) => {
  res.render('editProfile', { user: req.user });
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.session.userId);
    if (!user) return res.redirect('/?error=' + encodeURIComponent('User tidak ditemukan.'));

    user.username = req.body.username;
    user.email = req.body.email;

    if (req.file) {
      user.photo = path.join('uploads/profile-pictures', req.file.filename);
    }

    await user.save();
    res.redirect('/dashboard');
  } catch (err) {
    console.error('‼ Error saat update profil:', err.message);
    res.redirect('/dashboard?error=' + encodeURIComponent('Gagal update profil.'));
  }
};