"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      { tableName: "researchReports", schema: "wms" },
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID
        },
        documentTitle: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        documentDesc: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        year: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        researchReportFileURL: {
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
      }
    );
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable({
      tableName: "researchReports",
      schema: "wms"
    });
  }
};
