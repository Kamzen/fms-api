"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ApplicationAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Application, PositionQuestion }) {
      // define association here

      this.belongsTo(Application, { foreignKey: "candidateId" });
      this.belongsTo(PositionQuestion, { foreignKey: "positionQuestionId" });
    }
  }
  ApplicationAnswer.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      answer: {
        type: DataTypes.TEXT
      },
      positionQuestionId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      candidateId: {
        type: DataTypes.UUID,
        allowNull: false
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
      modelName: "ApplicationAnswer",
      tableName: "applicationAnswers",
      schema: "wms",
      timestamps: true
    }
  );
  return ApplicationAnswer;
};
