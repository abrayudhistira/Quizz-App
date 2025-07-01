const db = require('../config/db');
const path = require('path');

exports.showBadge = (req, res) => {
    try {
        const badge_id = req.params.badge_id;
        const query = 'SELECT * FROM badges WHERE badge_id = ?';
        db.query(query, [badge_id], (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).send('Internal Server Error');
            }
            if (results.length === 0) {
                return res.status(404).send('Badge not found');
            }
            const badge = results[0];
            const badgePath = path.join(__dirname, '../badges', badge.badge_image);
            res.sendFile(badgePath);
        });
    } catch (error) {
        console.error('Error in showBadge:', error);
        res.status(500).send('Internal Server Error');
    }
};