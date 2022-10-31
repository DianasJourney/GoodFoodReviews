const router = require('express').Router();
const { Review, User } = require('../models');

/* Asynchronously GET all user reviews and the reviewers' names and 
 * send the serialized data to the 'homepage' view.
 */
router.get('/', async(req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [User]
    });

    if (reviewData) {
      const reviews = reviewData.map(review => review.get({ plain: true }));
      res.render('homepage', { reviews, loggedIn: req.session.loggedIn });
    }
    else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// If the session user is logged in, redirect them away from accessing the login form again
router.get('/login', (req, res) => {
  (req.session.loggedIn) 
  ? res.redirect('/')
  : res.render('login');
});

// If the session user is logged in, redirect them away from accessing the sign-up form
router.get('/signup', (req, res) => {
  (req.session.loggedIn) 
  ? res.redirect('/')
  : res.render('signup');
})

module.exports = router;