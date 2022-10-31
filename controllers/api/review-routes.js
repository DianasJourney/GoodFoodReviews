const router = require('express').Router()
const { User, Comment, Review } = require('../../models')
const withAuth = require('../../utils/auth')
// New library - used to determine if a URL leads to an image
// Npm link: https://www.npmjs.com/package/image-url-validator
const isImageURL = require('image-url-validator').default

//withAuth out
router.post('/', async (req, res) => {
  //Validate image link before creating new Review
  if (await isImageURL(req.body.img)) {
    try {
      const newReview = await Review.create({
        title: req.body.title,
        description: req.body.description,
        img: req.body.img,
        user_id: req.session.user_id
      })
      console.log(newReview.get({ plain: true }))
      res.status(200).json(newReview.get({ plain: true }))
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    console.log('Not an image link!')
  }
})

//updating our posted review
router.put('/:id', withAuth, async (req, res) => {
  if (await isImageURL(req.body.img)) {
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
  } else {
    console.log('Not an image link!')
  }
})

// //deleting any of our reviews
router.delete('/:id', withAuth, async (req, res) => {
  try {
    console.log('deleting in 3 2 1')
    const review = await Review.destroy({
      where: {
        id: req.body.id //redundant, but double-checks that user trying to delete review is the user who made it
      }
    })
    res.status(200).json(review)

    // if (review > 0) {

    // } else {
    //   res.status(404).json({ message: 'No review found with this id!' })
    // }
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
})

//GET single review in prep to edit
router.get('/edit/:id', async (req, res) => {
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

    res.render('edit-post', { review, loggedIn: req.session.loggedIn })
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET single review in prep to delete
router.get('/delete/:id', async (req, res) => {
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

    res.render('delete-post', { review, loggedIn: req.session.loggedIn })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
