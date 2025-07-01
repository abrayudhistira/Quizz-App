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
        "badge_id",
      ],
      order: [["id", "ASC"]],
    });

    const [challengeRel] = await Promise.all([
      db.user_tantangan_relasi.findAll({ where: { user_id: req.user.id } }),
    ]);

    const challengeStatusMap = {};
    challengeRel.forEach(
      (c) => (challengeStatusMap[c.tantangan_id] = c.status)
    );

    res.render("user/tantangan/list-tantangan", {
      tantangan,
      challengeStatusMap,
    });
  } catch (error) {
    console.error("Gagal mengambil list tantangan:", error);
    res.status(500).send("Terjadi kesalahan saat mengambil list tantangan.");
  }
};

exports.showTantangan = async (req, res) => {
  const tantanganId = parseInt(req.params.id, 10);
  const userId = req.user.id;

  try {
    const tantangan = await db.tantangan.findByPk(tantanganId);
    const relasi = await db.user_tantangan_relasi.findOne({
      where: { user_id: userId, tantangan_id: tantanganId },
    });
    const status = relasi ? relasi.status : "not_started";

    res.render(`user/tantangan/tantangan${tantanganId}`, { tantangan, status });
  } catch (error) {
    res.status(500).send("Terjadi kesalahan.");
  }
};

exports.startTantangan = async (req, res) => {
  const userId = req.user.id;
  const tantanganId = parseInt(req.params.id, 10);

  try {
    // Pastikan untuk mengubah status ke 'in_progress'
    const [rec, created] = await db.user_tantangan_relasi.findOrCreate({
      where: { user_id: userId, tantangan_id: tantanganId },
      defaults: { status: "in_progress" },
    });

    if (!created) {
      rec.status = "in_progress";
      await rec.save();
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("Gagal start tantangan:", err);
    res.sendStatus(500);
  }
};

exports.finishTantangan = async (req, res) => {
  const userId = req.user.id;
  const tantanganId = parseInt(req.params.id, 10);

  try {
    const tantangan = await db.tantangan.findByPk(tantanganId, {
      attributes: ["point"],
    });

    if (!tantangan) {
      return res.status(404).json({
        success: false,
        message: "Tantangan tidak ditemukan.",
      });
    }

    // Temukan relasi tantangan
    const rec = await db.user_tantangan_relasi.findOne({
      where: { user_id: userId, tantangan_id: tantanganId },
    });

    if (!rec) {
      return res.status(404).json({
        success: false,
        message: "Relasi tantangan tidak ditemukan.",
      });
    }

    // Ubah status ke 'completed'
    rec.status = "completed";
    rec.point = tantangan.point || 0;
    rec.completed_at = new Date();

    await rec.save();

    res.json({ success: true, point: rec.point });
  } catch (err) {
    console.error("Gagal menyelesaikan tantangan:", err);
    res.status(500).json({ success: false });
  }
};
