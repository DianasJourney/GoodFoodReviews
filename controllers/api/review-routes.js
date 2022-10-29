const router = require('express').Router()
const { User, Comment, Review } = require('../../models')
const withAuth = require('../../utils/auth')

//withAuth out
router.post('/', async (req, res) => {
  console.log('router.post / reached')
  try {
    //console.log(req.session)

    const newReview = await Review.create({
      title: req.body.title,
      description: req.body.description,
      user_id: req.session.user_id
    })
    console.log(newReview.get({ plain: true }))
    res.status(200).json(newReview.get({ plain: true }))
  } catch (err) {
    res.status(500).json(err)
  }
})

//updating our posted review
router.put('/:id', withAuth, async (req, res) => {
  try {
    const reviewPost = await Review.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (reviewPost > 0) {
      res.status(200).end()
    } else {
      res.status(400).end()
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//deleting any of our reviews
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const reviewPost = await Review.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    })

    if (reviewPost > 0) {
      res.status(200).end()
    } else {
      res.status(404).json({ message: 'No review found with this id!' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//finds our single review by id
router.get('/:id', async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: { exclude: ['password', 'email'] }
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: { exclude: ['password', 'email'] }
            }
          ]
        }
      ]
    })

    const review = reviewData.get({ plain: true })

    res.render('single-review', { review, loggedIn: req.session.loggedIn })
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router
