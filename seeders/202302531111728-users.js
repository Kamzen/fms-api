"use strict";
const { v4: uuidv4 } = require("uuid");
const bcryptjs = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      { schema: "wms", tableName: "users", modelName: "User" },
      [
        {
          id: uuidv4(),
          fullName: "FMS Super User",
          userName: "Super User",
          email: "devsupport@fasset.org.za",
          password: await bcryptjs.hash(
            "@Password123",
            await bcryptjs.genSalt(10)
          ),
          userType: "Super",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
