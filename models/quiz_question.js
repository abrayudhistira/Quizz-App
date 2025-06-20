// models/quiz_question.js
const { Sequelize, DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('quiz_question', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    quiz_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'quiz',
        key: 'id'
      }
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    options: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    correct_answer: {
      type: DataTypes.STRING(10),
      allowNull: false
    },

    // override timestamps agar default CURRENT_TIMESTAMP
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
    tableName: 'quiz_question',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }]
      },
      {
        name: "quiz_id",
        using: "BTREE",
        fields: [{ name: "quiz_id" }]
      },
    ]
  });
};
