// models/user_quiz_relasi.js
const { Sequelize, DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('user_quiz_relasi', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    quiz_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'quiz',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('not_started','in_progress','completed'),
      allowNull: true,
      defaultValue: "not_started"
    },

    // override timestamps supaya default CURRENT_TIMESTAMP
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
    tableName: 'user_quiz_relasi',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [{ name: "user_id" }]
      },
      {
        name: "quiz_id",
        using: "BTREE",
        fields: [{ name: "quiz_id" }]
      },
    ]
  });
};
