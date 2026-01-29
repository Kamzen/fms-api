"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PositionQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Position, ApplicationAnswer }) {
      // define association here
      this.belongsTo(Position, { foreignKey: "positionId" });

      this.hasMany(ApplicationAnswer, { foreignKey: "positionQuestionId" });
    }
  }
  PositionQuestion.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false
      },
      expectedAnswer: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING
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
      modelName: "PositionQuestion",
      tableName: "positionQuestions",
      schema: "wms",
      timestamps: true
    }
  );
  return PositionQuestion;
};
