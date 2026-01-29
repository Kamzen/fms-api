"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      { tableName: "llEvents", schema: "wms" },
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID
        },
        serviceProvider: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        topic: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        trainingDates: {
          type: DataTypes.JSON,
          allowNull: false,
          defaultValue: []
        },
        registrationLink: {
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
      tableName: "llEvents",
      schema: "wms"
    });
  }
};
