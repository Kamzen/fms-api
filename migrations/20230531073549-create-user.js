"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    // create schema if not exist
    await queryInterface.sequelize.query("create schema if not exists wms;");
    await queryInterface.createTable(
      { schema: "wms", tableName: "users" },
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4
        },
        fullName: {
          type: DataTypes.STRING
        },
        userName: {
          type: DataTypes.STRING,
          unique: true
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          validate: {
            min: {
              args: [10],
              msg: "Minimum 10 characters required for password"
            }
          }
        },
        userType: {
          type: DataTypes.STRING
          // allowNull: false
        },
        departmentId: {
          type: DataTypes.UUID
          // allowNull: false
        },
        roleId: {
          type: DataTypes.UUID
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
        }
      },
      {
        schema: "wms",
        tableName: "users"
      }
    );
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable({ schema: "wms", tableName: "users" });
  }
};
