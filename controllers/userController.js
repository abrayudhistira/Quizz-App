const db = require('../config/db');
const path = require('path');

exports.showProfile = async (req, res) => {
  try {
    // Ambil user dari database berdasarkan id user yang login
    const user = await db.user.findByPk(req.user.id);

    // Contoh: hitung total point, badge, dsb jika perlu
    // const tantangan = await db.user_tantangan_relasi.findAll({ where: { user_id: req.user.id } });

    res.render('Profile', {
      user, // kirim data user ke view
      // tantangan
    });
  } catch (err) {
    console.error('Gagal mengambil data user:', err);
    res.status(500).send('Terjadi kesalahan saat mengambil profil.');
  }
};


exports.editProfileForm = async (req, res) => {
  const user = await db.user.findByPk(req.user.id);
  res.render('editProfile', { user });
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.user.id);
    user.username = req.body.username;
    user.email = req.body.email;
    if (req.file) {
      user.photo = path.join('uploads', req.file.filename);
    }
    await user.save();
    res.redirect('/profile');
  } catch (err) {
    console.error('Gagal update profil:', err);
    res.status(500).send('Gagal update profil');
  }
};