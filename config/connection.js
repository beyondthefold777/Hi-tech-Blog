require('dotenv').config();
const { Pool } = require('pg');

// Determine the environment and set the appropriate database configuration
const env = process.env.NODE_ENV || 'development';
const config = {
  development: {
    user: process.env.DEV_DB_USERNAME,
    host: process.env.DEV_DB_HOST,
    database: process.env.DEV_DB_DATABASE,
    password: process.env.DEV_DB_PASSWORD,
    port: 5432, // Default PostgreSQL port
  },
  test: {
    user: process.env.TEST_DB_USERNAME,
    host: process.env.TEST_DB_HOST,
    database: process.env.TEST_DB_DATABASE,
    password: process.env.TEST_DB_PASSWORD,
    port: 5432, // Default PostgreSQL port
  },
  production: {
    user: process.env.PROD_DB_USERNAME,
    host: process.env.PROD_DB_HOST,
    database: process.env.PROD_DB_DATABASE,
    password: process.env.PROD_DB_PASSWORD,
    port: 5432, // Default PostgreSQL port
  },
};

// Create a new connection pool using the appropriate configuration
const pool = new Pool(config[env]);

module.exports = pool;
