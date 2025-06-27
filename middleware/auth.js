// middleware/auth.js
require('dotenv').config();
const db = require('../config/db');

module.exports = async function (req, res, next) {
    if (!req.session || !req.session.userId) {
        return res.redirect('/?error=' + encodeURIComponent('Login diperlukan.'));
    }

    try {
        const user = await db.user.findByPk(req.session.userId, {
            attributes: ['id', 'username', 'email', 'role', 'photo']
        });
        if (!user) {
            req.session.destroy(() => {
                return res.redirect('/?error=' + encodeURIComponent('Sesi tidak valid.'));
            });
            return;
        }
        req.user = user.toJSON();
        next();
    } catch (err) {
        console.error(err);
        req.session.destroy(() => {
            return res.redirect('/?error=' + encodeURIComponent('Sesi error. Silakan login ulang.'));
        });
    }
};
