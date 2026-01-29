"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Position, ApplicationAnswer }) {
      // define association here
      this.belongsTo(Position, {
        foreignKey: "positionId"
      });

      this.hasMany(ApplicationAnswer, { foreignKey: "candidateId" });
    }
  }
  Application.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      firstName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      lastName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      nationality: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      race: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      idNumber: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      gender: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      cellphone: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      idDocumentName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      resumeDocumentName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      matricDocumentName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      qualificationDocumentName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      rejectReason: {
        type: DataTypes.TEXT
      },
      positionId: {
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
      modelName: "Application",
      tableName: "applications",
      schema: "wms",
      timestamps: true
    }
  );
  return Application;
};
