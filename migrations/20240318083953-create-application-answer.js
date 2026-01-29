"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      { schema: "wms", tableName: "applicationAnswers" },
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID
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
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      schema: "wms",
      tableName: "applicationAnswers"
    });
  }
};
