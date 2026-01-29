"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      { schema: "wms", tableName: "tenders" },
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID
        },
        tenderName: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        tenderReference: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        invitationMessage: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        bidMessage: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        queryEmail: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        tenderEndDate: {
          type: DataTypes.DATE,
        },
        closingDate: {
          type: DataTypes.DATE,
          allowNull: false
        },
        
        meetingLink: {
          type: DataTypes.TEXT
        },
        meetinngId: {
          type: DataTypes.TEXT
        },
        meetingLink: {
          type: DataTypes.TEXT
        },
        meetingPasscode: {
          type: DataTypes.TEXT
        },
        meetingDate: {
          type: DataTypes.DATE
        },
        tenderDocument: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        bidders: {
          type: DataTypes.ARRAY(DataTypes.JSON)
        },
        tenderStatus: {
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
    await queryInterface.dropTable({ schema: "wms", tableName: "tenders" });
  }
};
