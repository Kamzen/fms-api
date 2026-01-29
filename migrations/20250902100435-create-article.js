"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        schema: "wms",
        tableName: "articles"
      },
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true
        },
        title: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        subTitle: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        author: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        company: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        imageURL: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        documentURL: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        readTimeValue: {
          type: Sequelize.NUMERIC
        },
        readTimeUnit: {
          type: Sequelize.TEXT
        },
        tags: {
          type: Sequelize.ARRAY(Sequelize.TEXT),
          defaultValue: []
        },
        status: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: "draft"
        },
        shares: {
          type: Sequelize.NUMERIC,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      schema: "wms",
      tableName: "articles"
    });
  }
};
