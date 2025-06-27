const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_tantangan_relasi', {
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
    tantangan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tantangan',
        key: 'id'
      }
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('not_started','in_progress','completed','failed'),
      allowNull: false,
      defaultValue: "not_started"
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    badge_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'badge',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_tantangan_relasi',
    timestamps: false,
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
        name: "tantangan_id",
        using: "BTREE",
        fields: [
          { name: "tantangan_id" },
        ]
      },
      {
        name: "badge_id",
        using: "BTREE",
        fields: [
          { name: "badge_id" },
        ]
      },
    ]
  });
};
