"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Documents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ DocumentTitle }) {
      // define association here
      this.belongsTo(DocumentTitle, {
        foreignKey: "documentTitleId"
      });
    }
  }
  Documents.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      originalFileName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      fileName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      documentName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      documentTitleId: {
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
    },
    {
      sequelize,
      modelName: "Document",
      tableName: "documents",
      schema: "wms",
      timestamps: true
    }
  );
  return Documents;
};
