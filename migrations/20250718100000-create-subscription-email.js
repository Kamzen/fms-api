"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable(
      {
        schema: "wms",
        tableName: "subscibedEmails"
      },
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        status: {
          type: DataTypes.TEXT,
          allowNull: false,
          defaultValue: "active"
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
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable({
      schema: "wms",
      tableName: "subscibedEmails"
    });
  }
};
