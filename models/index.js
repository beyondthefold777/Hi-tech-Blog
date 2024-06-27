// models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/config.js');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./user')(sequelize, Sequelize);
db.Blog = require('./blog')(sequelize, Sequelize);

// Define associations
db.User.hasMany(db.Blog, { foreignKey: 'userId', as: 'blogs' });
db.Blog.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

module.exports = db;
