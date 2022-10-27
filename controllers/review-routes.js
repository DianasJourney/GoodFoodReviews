const router = require('express').Router();
const withAuth = require('../utils/auth');

//gets the single review by id
router.get('/:id', async (req, res) => {
    try{
        const reviewData = await Review.findByPk(req.params.id, {
            include: [User, {
                model: Comment,
                include: [User]
            }
        ]
        })
        const review = reviewData.get({ plain: true });
        res.render('single-review', { review, loggedIn: req.session.loggedIn });
    }
     catch(err) {
        res.status(500).json(err);
    }
});

//gets our review in our review dashboard
router.get('/', withAuth, async (req, res) => {
    try{
        const reviewData = await Review.findAll({
            where: {
                user_id: req.session.user_id
            }
        })
        const review = reviewData.map((review) => post.get({ plain: true }));
        res.render('reviewboard', { review, loggedIn: req.session.loggedIn })
    }
    catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;