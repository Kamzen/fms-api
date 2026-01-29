"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      { tableName: "committeeMembers", schema: "wms" },
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
        },
        position: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        committeeNameId: {
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
    await queryInterface.dropTable({
      tableName: "committeeMembers",
      schema: "wms"
    });
  }
};
