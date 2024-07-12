const sequelize = require('../config/connection');
const { Sequelize } = require('sequelize');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./user')(sequelize, Sequelize);
db.Blog = require('./blog')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

// Define associations
db.User.hasMany(db.Blog, { foreignKey: 'userId', as: 'blogs' });
db.Blog.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

db.Blog.hasMany(db.Comment, { foreignKey: 'blogId', as: 'Comments' });
db.Comment.belongsTo(db.Blog, { foreignKey: 'blogId', as: 'blog' });

db.User.hasMany(db.Comment, { foreignKey: 'userId', as: 'comments' });
db.Comment.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

module.exports = db;
