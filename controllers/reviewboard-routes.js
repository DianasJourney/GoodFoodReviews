const router = require('express').Router()
const { Review } = require('../models')
const withAuth = require('../utils/auth')

//gets our review in our review dashboard
router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      where: {
        user_id: req.session.user_id
      }
    })
    const review = reviewData.map(review => post.get({ plain: true }))
    res.render('reviewboard', { review, loggedIn: req.session.loggedIn })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/new', withAuth, (req, res) => {
  res.render('create-post', {
    layout: 'reviewboard'
  })
})

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id)
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true })

        res.render('edit-post', {
          layout: 'reviewboard',
          post
        })
      } else {
        res.status(404).end()
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router
