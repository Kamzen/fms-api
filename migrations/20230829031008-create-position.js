"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      { schema: "wms", tableName: "positions" },
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID
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
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({ schema: "wms", tableName: "positions" });
  }
};
