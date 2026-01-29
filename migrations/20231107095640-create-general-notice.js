"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      { schema: "wms", tableName: "generalNotices" },
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID
        },
        title: {
          type: DataTypes.TEXT
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        links: {
          type: DataTypes.ARRAY(DataTypes.STRING)
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
      tableName: "generalNotices"
    });
  }
};
