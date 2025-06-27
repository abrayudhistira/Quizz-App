const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
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
    correct_answer: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    option_a: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    option_b: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    option_c: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    option_d: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    option_e: {
      type: DataTypes.TEXT,
      allowNull: true
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
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "quiz_id",
        using: "BTREE",
        fields: [
          { name: "quiz_id" },
        ]
      },
    ]
  });
};
