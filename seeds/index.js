const sequelize = require('../config/connection');
const { User, Review, Comment } = require('../models');

const commentData = require('./commentData.json');
const reviewData = require('./reviewData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Review.bulkCreate(reviewData);
    await Comment.bulkCreate(commentData);

    process.exit(0);
}

seedDatabase();