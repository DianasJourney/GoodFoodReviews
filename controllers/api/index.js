const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const reviewRoutes = require('./review-routes');
const userRoutes = require('./user-routes');

router.use('/user', userRoutes);
router.use('/review', reviewRoutes);
router.use('/comment', commentRoutes);

module.exports = router;