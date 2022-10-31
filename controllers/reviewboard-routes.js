const router = require('express').Router()
const { Review, User } = require('../models')
const withAuth = require('../utils/auth')

//gets all of logged in users reviews in our review dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      where: {
        user_id: req.session.user_id
      }
    })

    const reviews = reviewData.map(review => review.get({ plain: true }))

    res.render('reviewboard', { reviews, loggedIn: req.session.loggedIn })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/create', withAuth, (req, res) => {
  console.log('reviewboard.get /create reached');
  res.render('create-post', {
    layout: 'main'
  })
})

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id);
    
    if (reviewData) {
      const review = reviewData.get({ plain: true });
      res.render('edit-post', {
        layout: 'main',
        review
      })
    } else {
      res.status(404).end()
    }
    } catch (err) {
      res.status(500).json(err)
    }
  });


router.get('/delete/:id', withAuth, async (req, res) => {
  try {
  const reviewData = await Review.findByPk(req.params.id);
  
  if (reviewData) {
    const review = reviewData.get({ plain: true });
    res.render('delete-post', {
      layout: 'main',
      review
    })
  } else {
    res.status(404).end()
  }
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router
