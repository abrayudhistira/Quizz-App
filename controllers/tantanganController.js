const db = require("../config/db");

exports.showListTantangan = async (req, res) => {
  try {
    const tantangan = await db.tantangan.findAll({
      attributes: [
        "id",
        "modul_id",
        "title",
        "description",
        "criteria",
        "point",
        "badge_id",
        "photo",
      ],
    });

    res.render("user/tantangan/list-tantangan", { tantangan });
  } catch (error) {
    console.error("Gagal mengambil data modul:", error);
    res.status(500).send("Terjadi kesalahan saat mengambil data modul.");
  }
};

exports.showTantangan1 = async (req, res) => {
  try {
    const tantangan = await db.tantangan.findAll({
      attributes: [
        "id",
        "modul_id",
        "title",
        "description",
        "criteria",
        "point",
        "badge_id",
        "photo",
      ],
    });

    res.render("user/tantangan/tantangan1", { tantangan });
  } catch (error) {
    console.error("Gagal mengambil data modul:", error);
    res.status(500).send("Terjadi kesalahan saat mengambil data modul.");
  }
};

exports.showTantangan2 = async (req, res) => {
  try {
    const tantangan = await db.tantangan.findAll({
      attributes: [
        "id",
        "modul_id",
        "title",
        "description",
        "criteria",
        "point",
        "badge_id",
        "photo",
      ],
    });

    res.render("user/tantangan/tantangan2", { tantangan });
  } catch (error) {
    console.error("Gagal mengambil data modul:", error);
    res.status(500).send("Terjadi kesalahan saat mengambil data modul.");
  }
};

exports.showTantangan3 = async (req, res) => {
  try {
    const tantangan = await db.tantangan.findAll({
      attributes: [
        "id",
        "modul_id",
        "title",
        "description",
        "criteria",
        "point",
        "badge_id",
        "photo",
      ],
    });

    res.render("user/tantangan/tantangan3", { tantangan });
  } catch (error) {
    console.error("Gagal mengambil data modul:", error);
    res.status(500).send("Terjadi kesalahan saat mengambil data modul.");
  }
};

exports.showTantangan4 = async (req, res) => {
  try {
    const tantangan = await db.tantangan.findAll({
      attributes: [
        "id",
        "modul_id",
        "title",
        "description",
        "criteria",
        "point",
        "badge_id",
        "photo",
      ],
    });

    res.render("user/tantangan/tantangan4", { tantangan });
  } catch (error) {
    console.error("Gagal mengambil data modul:", error);
    res.status(500).send("Terjadi kesalahan saat mengambil data modul.");
  }
};

exports.showTantangan5 = async (req, res) => {
  try {
    const tantangan = await db.tantangan.findAll({
      attributes: [
        "id",
        "modul_id",
        "title",
        "description",
        "criteria",
        "point",
        "badge_id",
        "photo",
      ],
    });

    res.render("user/tantangan/tantangan5", { tantangan });
  } catch (error) {
    console.error("Gagal mengambil data modul:", error);
    res.status(500).send("Terjadi kesalahan saat mengambil data modul.");
  }
};

exports.showTantangan6 = async (req, res) => {
  try {
    const tantangan = await db.tantangan.findAll({
      attributes: [
        "id",
        "modul_id",
        "title",
        "description",
        "criteria",
        "point",
        "badge_id",
        "photo",
      ],
    });

    res.render("user/tantangan/tantangan6", { tantangan });
  } catch (error) {
    console.error("Gagal mengambil data modul:", error);
    res.status(500).send("Terjadi kesalahan saat mengambil data modul.");
  }
};