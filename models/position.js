"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Department,
      PositionQualification,
      PositionQuestion,
      Application
    }) {
      // define association here
      this.belongsTo(Department, {
        foreignKey: "departmentId"
      });

      this.hasMany(PositionQualification, {
        foreignKey: "positionId"
      });

      this.hasMany(PositionQuestion, {
        foreignKey: "positionId"
      });
      this.hasMany(Application, {
        foreignKey: "positionId"
      });
    }
  }
  Position.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      jobTitle: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      purposeOfJob: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      departmentId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      reportingTo: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      remuneration: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      emailForQueries: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      applicationsEmail: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      closingDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      jobSpecDocumentName: {
        type: DataTypes.TEXT,
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
      modelName: "Position",
      tableName: "positions",
      schema: "wms"
    }
  );
  return Position;
};
