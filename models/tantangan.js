const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tantangan', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    task: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pass_condition: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fail_condition: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
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
    tableName: 'tantangan',
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
        name: "badge_id",
        using: "BTREE",
        fields: [
          { name: "badge_id" },
        ]
      },
    ]
  });
};
