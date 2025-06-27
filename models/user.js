const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "email"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin','user'),
      allowNull: true,
      defaultValue: "user"
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    total_point: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    user_banner_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    badge_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      references: {
        model: 'badge',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user',
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
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
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
