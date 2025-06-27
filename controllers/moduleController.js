const db = require('../config/db');

exports.showListModule = async (req, res) => {
  try {
    // ambil semua modul
    const modules = await db.modules.findAll({
      attributes: ['id', 'title', 'image_video_url'],
      order: [['id', 'ASC']]
    });
    // ambil progress user
    const progresses = await db.user_module_progress.findAll({
      where: { user_id: req.user.id },
      attributes: ['module_id', 'status']
    });
    const statusMap = {};
    progresses.forEach(p => statusMap[p.module_id] = p.status);

    res.render('user/modules/list-module', { modules, statusMap });
  } catch (error) {
    console.error('Gagal mengambil data modul:', error);
    res.status(500).send('Terjadi kesalahan saat mengambil data modul.');
  }
};

exports.startModule = async (req, res) => {
  const userId   = req.user.id;
  const moduleId = parseInt(req.params.id, 10);

  try {
    // findOrCreate lalu set status in_progress
    const [prog, created] = await db.user_module_progress.findOrCreate({
      where: { user_id: userId, module_id: moduleId },
      defaults: { status: 'in_progress', completed_at: null }
    });
    if (!created && prog.status !== 'in_progress') {
      prog.status = 'in_progress';
      prog.completed_at = null;
      await prog.save();
    }
    // balas tanpa body, JS akan redirect
    res.sendStatus(200);
  } catch (err) {
    console.error('Gagal set in_progress:', err);
    res.sendStatus(500);
  }
};
// exports.showModule1 = async (req, res) => {
//     try {
//         const modules = await db.modules.findAll({
//           attributes: ['id', 'title', 'description', 'image_video_url']
//         });
    
//         res.render('user/modules/module1/modul1', { modules });
//       } catch (error) {
//         console.error('Gagal mengambil data modul:', error);
//         res.status(500).send('Terjadi kesalahan saat mengambil data modul.');
//       }
// };
// exports.showModule2 = async (req, res) => {
//     try {
//         const modules = await db.modules.findAll({
//           attributes: ['id', 'title', 'description', 'image_video_url']
//         });
    
//         res.render('user/modules/module2/modul2', { modules });
//       } catch (error) {
//         console.error('Gagal mengambil data modul:', error);
//         res.status(500).send('Terjadi kesalahan saat mengambil data modul.');
//       }
// };
// exports.showModule3 = async (req, res) => {
//     try {
//         const modules = await db.modules.findAll({
//           attributes: ['id', 'title', 'description', 'image_video_url']
//         });
    
//         res.render('user/modules/module3/modul3', { modules });
//       } catch (error) {
//         console.error('Gagal mengambil data modul:', error);
//         res.status(500).send('Terjadi kesalahan saat mengambil data modul.');
//       }
// };
// exports.showModule4 = async (req, res) => {
//     try {
//         const modules = await db.modules.findAll({
//           attributes: ['id', 'title', 'description', 'image_video_url']
//         });
    
//         res.render('user/modules/module4/modul4', { modules });
//       } catch (error) {
//         console.error('Gagal mengambil data modul:', error);
//         res.status(500).send('Terjadi kesalahan saat mengambil data modul.');
//       }
// };
// exports.showModule5 = async (req, res) => {
//     try {
//         const modules = await db.modules.findAll({
//           attributes: ['id', 'title', 'description', 'image_video_url']
//         });
    
//         res.render('user/modules/module5/modul5', { modules });
//       } catch (error) {
//         console.error('Gagal mengambil data modul:', error);
//         res.status(500).send('Terjadi kesalahan saat mengambil data modul.');
//       }
// };
// exports.showModule6 = async (req, res) => {
//     try {
//         const modules = await db.modules.findAll({
//           attributes: ['id', 'title', 'description', 'image_video_url']
//         });
    
//         res.render('user/modules/module6/modul6', { modules });
//       } catch (error) {
//         console.error('Gagal mengambil data modul:', error);
//         res.status(500).send('Terjadi kesalahan saat mengambil data modul.');
//       }
// };

// controllers/moduleController.js
exports.showModule = async (req, res) => {
  const moduleId = parseInt(req.params.id, 10);
  try {
    // Ambil data modul yang dipilih
    const module = await db.modules.findByPk(moduleId, {
      attributes: ['id', 'title', 'description', 'image_video_url']
    });
    if (!module) return res.status(404).send('Modul tidak ditemukan');

    // Render EJS berdasarkan moduleId
    // Jika kamu masih memiliki folder/module terpisah (module1/modul1.ejs, dll):
    const viewPath = `user/modules/module${moduleId}/modul${moduleId}`;

    // Atau, kalau mau satu template generik:
    // const viewPath = 'user/modules/modul';

    return res.render(viewPath, { module });
  } catch (error) {
    console.error('Gagal mengambil modul:', error);
    res.status(500).send('Terjadi kesalahan saat mengambil modul.');
  }
};


exports.completeModule = async (req, res) => {
  const userId   = req.user.id;
  const moduleId = parseInt(req.params.id, 10);

  try {
    const [prog, created] = await db.user_module_progress.findOrCreate({
      where: { user_id: userId, module_id: moduleId },
      defaults: {
        status: 'completed',
        completed_at: new Date()
      }
    });

    if (!created) {
      prog.status       = 'completed';
      prog.completed_at = new Date();
      await prog.save();
    }

    res.redirect(`/module/${moduleId}`);
  } catch (error) {
    console.error('Gagal menyimpan progress:', error);
    res.status(500).send('Terjadi kesalahan saat menyimpan progress.');
  }
};