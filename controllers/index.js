const router = require('express').Router();
const homeRoutes = require('./home-routes');
const reviewBoardRoute = require('./reviewboard-routes')

const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/reviewboard', reviewBoardRoute);
router.use('/api', apiRoutes);

module.exports = router;