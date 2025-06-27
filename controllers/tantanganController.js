const db = require("../config/db");

exports.showListTantangan = async (req, res) => {
  try {
    const tantangan = await db.tantangan.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "task",
        "pass_condition",
        "fail_condition",
        "point",
        "badge_id"
      ],
      order: [["id", "ASC"]]
    });
    res.render('user/tantangan/list-tantangan', { tantangan });
  } catch (error) {
    console.error("Gagal mengambil list tantangan:", error);
    res.status(500).send("Terjadi kesalahan saat mengambil list tantangan.");
  }
};

exports.showTantangan = async (req, res) => {
  const modulId = parseInt(req.params.id, 10);
  try {
    // hanya tantangan untuk modul tertentu
    const tantangan = await db.tantangan.findByPk(modulId, {
      attributes: [
        "id",
        "title",
        "description",
        "task",
        "pass_condition",
        "fail_condition",
        "point",
        "badge_id"
      ]
    });
    if (!tantangan) {
      return res.status(404).send('Tantangan untuk modul ini tidak ditemukan.');
    }
    res.render(`user/tantangan/tantangan${modulId}`, { tantangan });
  } catch (error) {
    console.error(`Gagal mengambil tantangan modul ${modulId}:`, error);
    res.status(500).send("Terjadi kesalahan saat mengambil tantangan.");
  }
};

// contoh utk set in_progress
exports.startTantangan = async (req, res) => {
  const userId = req.user.id;
  const tantanganId = parseInt(req.params.id, 10);
  try {
    const [rec, created] = await db.user_tantangan_relasi.findOrCreate({
      where: { user_id: userId, tantangan_id: tantanganId },
      defaults: { status: 'in_progress', point: 0, completed_at: null }
    });
    if (!created && rec.status !== 'in_progress') {
      rec.status = 'in_progress';
      await rec.save();
    }
    res.sendStatus(200);
  } catch (err) {
    console.error('Gagal start tantangan:', err);
    res.sendStatus(500);
  }
};

exports.finishTantangan = async (req, res) => {
  const userId = req.user.id;
  const tantanganId = parseInt(req.params.id, 10);
  try {
    // Ambil point dari tabel tantangan
    const tantangan = await db.tantangan.findByPk(tantanganId, { attributes: ['point'] });
    if (!tantangan) return res.status(404).json({ success: false, message: 'Tantangan tidak ditemukan.' });

    // Update relasi user-tantangan
    const rec = await db.user_tantangan_relasi.findOne({
      where: { user_id: userId, tantangan_id: tantanganId }
    });
    if (!rec) return res.status(404).json({ success: false, message: 'Relasi tantangan tidak ditemukan.' });

    rec.status = 'completed';
    rec.point = tantangan.point || 0;
    rec.completed_at = new Date();
    await rec.save();

    res.json({ success: true, point: rec.point });
  } catch (err) {
    console.error('Gagal menyelesaikan tantangan:', err);
    res.status(500).json({ success: false });
  }
};

// exports.showTantangan1 = async (req, res) => {
//   try {
//     const tantangan = await db.tantangan.findAll({
//       attributes: [
//         "id",
//         "modul_id",
//         "title",
//         "description",
//         "criteria",
//         "point",
//         "badge_id",
//         "photo",
//       ],
//     });

//     res.render("user/tantangan/tantangan1", { tantangan });
//   } catch (error) {
//     console.error("Gagal mengambil data modul:", error);
//     res.status(500).send("Terjadi kesalahan saat mengambil data modul.");
//   }
// };

// exports.showTantangan2 = async (req, res) => {
//   try {
//     const tantangan = await db.tantangan.findAll({
//       attributes: [
//         "id",
//         "modul_id",
//         "title",
//         "description",
//         "criteria",
//         "point",
//         "badge_id",
//         "photo",
//       ],
//     });

//     res.render("user/tantangan/tantangan2", { tantangan });
//   } catch (error) {
//     console.error("Gagal mengambil data modul:", error);
//     res.status(500).send("Terjadi kesalahan saat mengambil data modul.");
//   }
// };

// exports.showTantangan3 = async (req, res) => {
//   try {
//     const tantangan = await db.tantangan.findAll({
//       attributes: [
//         "id",
//         "modul_id",
//         "title",
//         "description",
//         "criteria",
//         "point",
//         "badge_id",
//         "photo",
//       ],
//     });

//     res.render("user/tantangan/tantangan3", { tantangan });
//   } catch (error) {
//     console.error("Gagal mengambil data modul:", error);
//     res.status(500).send("Terjadi kesalahan saat mengambil data modul.");
//   }
// };

// exports.showTantangan4 = async (req, res) => {
//   try {
//     const tantangan = await db.tantangan.findAll({
//       attributes: [
//         "id",
//         "modul_id",
//         "title",
//         "description",
//         "criteria",
//         "point",
//         "badge_id",
//         "photo",
//       ],
//     });

//     res.render("user/tantangan/tantangan4", { tantangan });
//   } catch (error) {
//     console.error("Gagal mengambil data modul:", error);
//     res.status(500).send("Terjadi kesalahan saat mengambil data modul.");
//   }
// };

// exports.showTantangan5 = async (req, res) => {
//   try {
//     const tantangan = await db.tantangan.findAll({
//       attributes: [
//         "id",
//         "modul_id",
//         "title",
//         "description",
//         "criteria",
//         "point",
//         "badge_id",
//         "photo",
//       ],
//     });

//     res.render("user/tantangan/tantangan5", { tantangan });
//   } catch (error) {
//     console.error("Gagal mengambil data modul:", error);
//     res.status(500).send("Terjadi kesalahan saat mengambil data modul.");
//   }
// };

// exports.showTantangan6 = async (req, res) => {
//   try {
//     const tantangan = await db.tantangan.findAll({
//       attributes: [
//         "id",
//         "modul_id",
//         "title",
//         "description",
//         "criteria",
//         "point",
//         "badge_id",
//         "photo",
//       ],
//     });

//     res.render("user/tantangan/tantangan6", { tantangan });
//   } catch (error) {
//     console.error("Gagal mengambil data modul:", error);
//     res.status(500).send("Terjadi kesalahan saat mengambil data modul.");
//   }
// };