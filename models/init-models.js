var DataTypes = require("sequelize").DataTypes;
var _badge = require("./badge");
var _modules = require("./modules");
var _quiz = require("./quiz");
var _quiz_question = require("./quiz_question");
var _subbab = require("./subbab");
var _tantangan = require("./tantangan");
var _user = require("./user");
var _user_module_progress = require("./user_module_progress");
var _user_quiz_relasi = require("./user_quiz_relasi");
var _user_tantangan_relasi = require("./user_tantangan_relasi");

function initModels(sequelize) {
  var badge = _badge(sequelize, DataTypes);
  var modules = _modules(sequelize, DataTypes);
  var quiz = _quiz(sequelize, DataTypes);
  var quiz_question = _quiz_question(sequelize, DataTypes);
  var subbab = _subbab(sequelize, DataTypes);
  var tantangan = _tantangan(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_module_progress = _user_module_progress(sequelize, DataTypes);
  var user_quiz_relasi = _user_quiz_relasi(sequelize, DataTypes);
  var user_tantangan_relasi = _user_tantangan_relasi(sequelize, DataTypes);

  tantangan.belongsTo(badge, { as: "badge", foreignKey: "badge_id"});
  badge.hasMany(tantangan, { as: "tantangans", foreignKey: "badge_id"});
  user_tantangan_relasi.belongsTo(badge, { as: "badge", foreignKey: "badge_id"});
  badge.hasMany(user_tantangan_relasi, { as: "user_tantangan_relasis", foreignKey: "badge_id"});
  quiz.belongsTo(modules, { as: "module", foreignKey: "module_id"});
  modules.hasOne(quiz, { as: "quiz", foreignKey: "module_id"});
  subbab.belongsTo(modules, { as: "modul", foreignKey: "modul_id"});
  modules.hasMany(subbab, { as: "subbabs", foreignKey: "modul_id"});
  tantangan.belongsTo(modules, { as: "modul", foreignKey: "modul_id"});
  modules.hasMany(tantangan, { as: "tantangans", foreignKey: "modul_id"});
  user_module_progress.belongsTo(modules, { as: "module", foreignKey: "module_id"});
  modules.hasMany(user_module_progress, { as: "user_module_progresses", foreignKey: "module_id"});
  quiz_question.belongsTo(quiz, { as: "quiz", foreignKey: "quiz_id"});
  quiz.hasMany(quiz_question, { as: "quiz_questions", foreignKey: "quiz_id"});
  user_quiz_relasi.belongsTo(quiz, { as: "quiz", foreignKey: "quiz_id"});
  quiz.hasMany(user_quiz_relasi, { as: "user_quiz_relasis", foreignKey: "quiz_id"});
  user_tantangan_relasi.belongsTo(tantangan, { as: "tantangan", foreignKey: "tantangan_id"});
  tantangan.hasMany(user_tantangan_relasi, { as: "user_tantangan_relasis", foreignKey: "tantangan_id"});
  user_module_progress.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_module_progress, { as: "user_module_progresses", foreignKey: "user_id"});
  user_quiz_relasi.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_quiz_relasi, { as: "user_quiz_relasis", foreignKey: "user_id"});
  user_tantangan_relasi.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_tantangan_relasi, { as: "user_tantangan_relasis", foreignKey: "user_id"});

  return {
    badge,
    modules,
    quiz,
    quiz_question,
    subbab,
    tantangan,
    user,
    user_module_progress,
    user_quiz_relasi,
    user_tantangan_relasi,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
