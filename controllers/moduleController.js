const db = require('../config/db');

exports.showListModule = async (req, res) => {
    try {
        const modules = await db.modules.findAll({
          attributes: ['id', 'title', 'description', 'image_video_url']
        });
    
        res.render('user/modules/list-module', { modules });
      } catch (error) {
        console.error('Gagal mengambil data modul:', error);
        res.status(500).send('Terjadi kesalahan saat mengambil data modul.');
      }
};
exports.showModule1 = async (req, res) => {
    try {
        const modules = await db.modules.findAll({
          attributes: ['id', 'title', 'description', 'image_video_url']
        });
    
        res.render('user/modules/module1/modul1', { modules });
      } catch (error) {
        console.error('Gagal mengambil data modul:', error);
        res.status(500).send('Terjadi kesalahan saat mengambil data modul.');
      }
};
exports.showModule2 = async (req, res) => {
    try {
        const modules = await db.modules.findAll({
          attributes: ['id', 'title', 'description', 'image_video_url']
        });
    
        res.render('user/modules/module2/modul2', { modules });
      } catch (error) {
        console.error('Gagal mengambil data modul:', error);
        res.status(500).send('Terjadi kesalahan saat mengambil data modul.');
      }
};
exports.showModule3 = async (req, res) => {
    try {
        const modules = await db.modules.findAll({
          attributes: ['id', 'title', 'description', 'image_video_url']
        });
    
        res.render('user/modules/module3/modul3', { modules });
      } catch (error) {
        console.error('Gagal mengambil data modul:', error);
        res.status(500).send('Terjadi kesalahan saat mengambil data modul.');
      }
};
exports.showModule4 = async (req, res) => {
    try {
        const modules = await db.modules.findAll({
          attributes: ['id', 'title', 'description', 'image_video_url']
        });
    
        res.render('user/modules/module4/modul4', { modules });
      } catch (error) {
        console.error('Gagal mengambil data modul:', error);
        res.status(500).send('Terjadi kesalahan saat mengambil data modul.');
      }
};
exports.showModule5 = async (req, res) => {
    try {
        const modules = await db.modules.findAll({
          attributes: ['id', 'title', 'description', 'image_video_url']
        });
    
        res.render('user/modules/module5/modul5', { modules });
      } catch (error) {
        console.error('Gagal mengambil data modul:', error);
        res.status(500).send('Terjadi kesalahan saat mengambil data modul.');
      }
};
exports.showModule6 = async (req, res) => {
    try {
        const modules = await db.modules.findAll({
          attributes: ['id', 'title', 'description', 'image_video_url']
        });
    
        res.render('user/modules/module6/modul6', { modules });
      } catch (error) {
        console.error('Gagal mengambil data modul:', error);
        res.status(500).send('Terjadi kesalahan saat mengambil data modul.');
      }
};