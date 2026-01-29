"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      { schema: "wms", tableName: "grantWindowApplications" },
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
        grantType: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        closingDate: {
          allowNull: false,
          type: DataTypes.DATE
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
      schema: "wms",
      tableName: "grantWindowApplications"
    });
  }
};
