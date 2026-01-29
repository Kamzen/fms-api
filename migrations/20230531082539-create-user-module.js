"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      { schema: "wms", tableName: "userModules" },
      {
        id: {
          primaryKey: true,
          type: DataTypes.UUID
        },
        moduleId: {
          type: DataTypes.UUID
        },
        userId: {
          type: DataTypes.UUID
        },
        dateCreated: {
          allowNull: false,
          type: DataTypes.DATE
        },
        dateUpdated: {
          allowNull: false,
          type: DataTypes.DATE
        }
      },
      {
        schema: "wms",
        tableName: "userModules"
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({ schema: "wms", tableName: "userModules" });
  }
};
