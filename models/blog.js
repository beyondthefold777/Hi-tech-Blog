const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      Blog.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Blog.hasMany(models.Comment, { foreignKey: 'blogId', as: 'Comments' });
    }
  }

  Blog.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Blog',
  });

  return Blog;
};
