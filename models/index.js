const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';

let sequelize;

if (env === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  });
}

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
