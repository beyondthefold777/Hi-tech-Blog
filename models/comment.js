// models/comment.js
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Blog, { foreignKey: 'blogId' });
      Comment.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Comment.init({
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });

  return Comment;
};
