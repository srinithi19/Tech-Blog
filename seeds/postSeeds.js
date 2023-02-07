const { Post } = require('../models');

const postData = [
  {
    title: 'front end',
    post_content:'HTML/CSS/JS',
    user_id: 1,
  },
  {
    title: 'back end',
    post_content:'node/express/mysql',
    user_id: 2,
  },
];

const seedPosts = () => Post.bulkCreate(postData, { individualHooks: true});
module.exports = seedPosts;