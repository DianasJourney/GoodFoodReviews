const User = require('./User')
const Review = require('./Review')
const Comment = require('./Comment')

User.hasMany(Comment, {
  foreignKey: 'user_id',
})

User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Comment.belongsTo(Review, {
  foreignKey: 'review_id',
  onDelete: 'CASCADE'
})

Review.hasMany(Comment, {
  foreignKey: 'review_id',
})

Review.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
  foreignKey: 'user_id',
})

module.exports = {
  User,
  Comment,
  Review
}
