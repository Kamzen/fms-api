"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PositionQualification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Position, Qualification }) {
      // define association here
      this.belongsTo(Position, {
        foreignKey: "positionId"
      });

      this.belongsTo(Qualification, {
        foreignKey: "qualificationId"
      });
    }
  }
  PositionQualification.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      positionId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      qualificationId: {
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
      modelName: "PositionQualification",
      tableName: "positionQualifications",
      schema: "wms"
    }
  );
  return PositionQualification;
};
