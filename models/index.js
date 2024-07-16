const User = require('./user.js');
const Post = require('./post.js');
const Comment = require('./comments.js');

User.hasMany(Post, 
    { foreignKey: 'userId'});
Post.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

module.exports = { User, Post, Comment };