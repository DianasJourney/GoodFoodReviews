const router = require('express').Router();
const homeRoutes = require('./home-routes');
const reviewRoutes = require('./review-routes');

const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/review', reviewRoutes);
router.use('/api', apiRoutes);

module.exports = router;