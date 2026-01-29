"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Committee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ CommitteeName }) {
      // define association here
      this.belongsTo(CommitteeName, { foreignKey: "committeeNameId" });
    }
  }
  Committee.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      fullname: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      imageFileURL: {
        type: DataTypes.TEXT
      },
      position: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      committeeNameId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: "Committee",
      tableName: "committeeMembers",
      schema: "wms",
      timestamps: true
    }
  );
  return Committee;
};
