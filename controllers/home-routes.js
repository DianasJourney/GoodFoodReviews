const router = require('express').Router()
const { Review, User } = require('../models')

//Get all reviews for homepage
router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [User]
    })
    const reviews = reviewData.map(review => review.get({ plain: true }))
    res.render('homepage', { reviews, loggedIn: req.session.loggedIn })
  } catch (err) {
    res.status(500).json(err)
  }
})

//get login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  res.render('login')
})

// get signup

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  res.render('signup')
})

module.exports = router
