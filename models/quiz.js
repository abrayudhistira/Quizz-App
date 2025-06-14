const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('quiz', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'modules',
        key: 'id'
      },
      unique: "quiz_ibfk_1"
    }
  }, {
    sequelize,
    tableName: 'quiz',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "module_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "module_id" },
        ]
      },
    ]
  });
};
