// models/quiz.js
const { Sequelize, DataTypes } = require('sequelize');

module.exports = function(sequelize) {
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
    },

    // Override timestamps:
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
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
        fields: [{ name: "id" }]
      },
      {
        name: "module_id",
        unique: true,
        using: "BTREE",
        fields: [{ name: "module_id" }]
      },
    ]
  });
};