"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      { schema: "wms", tableName: "documentTitles" },
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
      tableName: "documentTitles"
    });
  }
};
