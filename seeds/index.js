const seedPosts = require('./postSeeds');
const seedUsers = require('./userSeeds');
const seedComments = require('./commentSeeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  try {
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
  } catch (err) {
    console.log(err);
  }
  try {
    await seedPosts();
    console.log('\n----- POSTS SEEDED -----\n');
  } catch (err) {
    console.log(err);
  }
  try {
    await seedComments();
    console.log('\n----- COMMENTS SEEDED -----\n');
  } catch (err) {
    console.log(err);
  }

  process.exit(0);
};

seedAll();