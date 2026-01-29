"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.hasMany(models.ArticleView, {
        foreignKey: "articleId",
        as: "articleViews"
      });
    }
  }
  Article.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      subTitle: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      author: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      company: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      imageURL: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: null
      },
      documentURL: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      readTimeValue: {
        type: DataTypes.NUMERIC
      },
      readTimeUnit: {
        type: DataTypes.TEXT
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: []
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "draft"
      },
      shares: {
        type: DataTypes.NUMERIC,
        allowNull: false,
        defaultValue: 0
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
      modelName: "Article",
      schema: "wms",
      tableName: "articles",
      timestamps: true
    }
  );
  return Article;
};
