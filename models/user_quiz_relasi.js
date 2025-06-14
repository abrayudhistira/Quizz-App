const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
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
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
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
