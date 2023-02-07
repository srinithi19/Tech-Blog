const { Comment } = require('../models');

const commentData = [
  {
    user_id: 2,
    post_id: 1,
    comment: 'easy',
  },
  {
    user_id: 1,
    post_id: 2,
    comment:'hard',
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;