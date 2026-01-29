"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      { schema: "wms", tableName: "documents" },
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID
        },
        originalFileName: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        fileName: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        documentName: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        documentTitleId: {
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
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable({ schema: "wms", tableName: "documents" });
  }
};
