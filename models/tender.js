"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tender extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tender.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      tenderName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      tenderReference: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      invitationMessage: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      bidMessage: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      queryEmail: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      tenderEndDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      closingDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      meetingLink: {
        type: DataTypes.TEXT
      },
      meetinngId: {
        type: DataTypes.TEXT
      },
      meetingLink: {
        type: DataTypes.TEXT
      },
      meetingPasscode: {
        type: DataTypes.TEXT
      },
      meetingDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      tenderDocument: {
        type: DataTypes.TEXT
      },
      bidders: {
        type: DataTypes.ARRAY(DataTypes.JSON)
      },
      tenderStatus: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "active"
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
      modelName: "Tender",
      tableName: "tenders",
      schema: "wms",
      timestamps: true
    }
  );
  return Tender;
};
