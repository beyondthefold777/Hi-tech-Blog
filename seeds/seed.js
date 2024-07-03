// seeds/seed.js
const sequelize = require('../config/connection');
const { User } = require('../models');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  console.log('Database seeded!');
  process.exit(0);
};

seedDatabase();
