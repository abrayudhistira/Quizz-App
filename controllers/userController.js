const db = require('../config/db');
const path = require('path');
const badge = require('../models/badge');

exports.showProfile = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.user.id);

    //badge
    let badgeTitle = null;
    let badgeDescription = null;
    if (user.badge_id) {
      const badge = await db.badge.findByPk(user.badge_id);
      badgeTitle = badge ? badge.title : null;
      badgeDescription = badge ? badge.description : null;
    }

    // Modul
    const totalModules = await db.modules.count();
    const completedModules = await db.user_module_progress.count({
      where: { user_id: user.id, status: 'completed' }
    });

    // Quiz
    const totalQuizzes = await db.quiz.count();
    const completedQuizzes = await db.user_quiz_relasi.count({
      where: { user_id: user.id, status: 'completed' }
    });

    // Tantangan
    const totalTantangan = await db.tantangan.count();
    const completedTantangan = await db.user_tantangan_relasi.count({
      where: { user_id: user.id, status: 'completed' }
    });

    // Set session (opsional)
    req.session.badgeId = user.badge_id || null;
    req.session.badgeTitle = badgeTitle;
    req.session.badgeDescription = badgeDescription;
    req.session.totalPoint = user.total_point || 0;

    // Render view
    res.render('Profile', {
      user,
      badgeTitle,
      badgeDescription,
      totalPoint: user.total_point || 0,
      completedModules,
      totalModules,
      completedQuizzes,
      totalQuizzes,
      completedTantangan,
      totalTantangan
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

// exports.updateProfile = async (req, res) => {
//   try {
//     const user = await db.user.findByPk(req.user.id);
//     user.username = req.body.username;
//     user.email = req.body.email;
//     if (req.file) {
//       user.photo = path.join('uploads', req.file.filename);
//     }
//     if (req.file) {
//       user.user_banner_url = path.join('uploads', req.file.filename);
//     }
//     await user.save();
//     res.redirect('/profile');
//   } catch (err) {
//     console.error('Gagal update profil:', err);
//     res.status(500).send('Gagal update profil');
//   }
// };

exports.updateProfile = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.user.id);
    user.username = req.body.username;
    user.email = req.body.email;

    // Ganti password jika diisi
    if (req.body.password && req.body.password.trim() !== '') {
      const bcrypt = require('bcryptjs');
      const saltRounds = parseInt(process.env.BCRYPT_ROUND);
      user.password = await bcrypt.hash(req.body.password, saltRounds);
    }

    // Upload banner jika ada file
    if (req.files && req.files.banner_url) {
      const bannerFile = req.files.banner_url[0];
      user.user_banner_url = bannerFile.path.replace(/\\/g, '/'); // simpan path relatif
    }
    if (req.files && req.files.photo) {
      const photoFile = req.files.photo[0];
      user.photo = photoFile.path.replace(/\\/g, '/'); // simpan path relatif
    }

    await user.save();
    res.redirect('/profile');
  } catch (err) {
    console.error('Gagal update profil:', err);
    res.status(500).send('Gagal update profil');
  }
};