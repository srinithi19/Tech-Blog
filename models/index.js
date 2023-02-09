const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',

});

User.hasMany(Comment, {
  foreignKey: 'user_id',

});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',

});

module.exports = { User, Post, Comment };