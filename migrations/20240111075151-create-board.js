"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      { tableName: "boardMemders", schema: "wms" },
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
        fullname: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        imageFileURL: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        position: {
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
      tableName: "boardMemders",
      schema: "wms"
    });
  }
};
