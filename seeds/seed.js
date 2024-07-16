
const sequelize = require('../config/connection.js');
const { User, Comment, Post} = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentsData = require('./commentsData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
console.log(users)
const posts = await Post.bulkCreate(postData)
console.log(posts);

await Comment.bulkCreate(commentsData)
console.log("COMMENT UPLOADED");

  process.exit(0);
};

seedDatabase();
