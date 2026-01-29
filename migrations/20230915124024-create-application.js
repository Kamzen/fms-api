"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      { schema: "wms", tableName: "applications" },
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID
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
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      schema: "wms",
      tableName: "applications"
    });
  }
};
