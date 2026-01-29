"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ArticleView extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ArticleView.belongsTo(models.Article, {
        foreignKey: "articleId"
      });
    }
  }
  ArticleView.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      articleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "articles",
          key: "id"
        }
      },
      browserId: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "ArticleView",
      tableName: "articleViews",
      schema: "wms",
      timestamps: true
    }
  );
  return ArticleView;
};
