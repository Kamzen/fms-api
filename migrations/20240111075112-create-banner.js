"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      { tableName: "banners", schema: "wms" },
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID
        },
        bannerImageURL: {
          type: DataTypes.TEXT
        },
        bannerText: {
          type: DataTypes.TEXT
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
    await queryInterface.dropTable({ tableName: "banners", schema: "wms" });
  }
};
