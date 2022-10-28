const User = require('./User');
const Review = require('./Review');
const Comment = require('./Comment');
/**
 * 1 user has many reviews
 * 1 review has one user and many comments
 * 1 comment belongs to 1 review and one user
 */

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

User.hasMany(Review, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Review, {
    foreignKey: 'review_id'
});

Review.hasMany(Comment, {
    foreignKey: 'review_id'
})

Review.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = {
    User,
    Comment,
    Review
};
