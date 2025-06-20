const db = require('../config/db');

exports.showSimulasi = async (req, res) => {
    try {
        const modules = await db.modules.findAll({
          attributes: ['id', 'title', 'description', 'image_video_url']
        });
    
        res.render('user/simulasi/simulasi', { modules });
      } catch (error) {
        console.error('Gagal mengambil data modul:', error);
        res.status(500).send('Terjadi kesalahan saat mengambil data modul.');
      }
};