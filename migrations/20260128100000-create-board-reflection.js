"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      { tableName: "boardReflections", schema: "wms" },
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID
        },
        title: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        period: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        documentURL: {
          type: DataTypes.TEXT,
          allowNull: true,
          defaultValue: null
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
      tableName: "boardReflections",
      schema: "wms"
    });
  }
};
