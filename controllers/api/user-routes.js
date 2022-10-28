const router = require('express').Router()
const { User, Review, Comment } = require('../../models')
const withAuth = require('../../utils/auth')

// GET all Users and their Reviews and Comments
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [Review, Comment]
    })
    const users = userData.map(user => post.get({ plain: true }))
    res.render('homepage', { users, loggedIn: req.session.loggedIn }) // render: homepage?
  } catch (err) {
    res.status(500).json(err)
  }
})

// GET User by ID and their Reviews and Comments
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: { exclude: ['password'] }, //get everything but the password fields
      where: {
        id: req.params.id
      },
      include: [Review, Comment]
    })

    const user = userData.get({ plain: true })
    res.status(200).json(user) // rendering to ?
  } catch (err) {
    res.status(500).json(err)
  }
})

// CREATE User
// POST /api/users
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    const saveSess = req.session.save(() => {
      req.session.id = userData.id
      req.session.name = userData.name
      req.session.loggedIn = true
      res.json(saveSess)
    })
  } catch (err) {
    res.status(500).json(err)
  }
})
// UPDATE User //optional?

// DELETE User //optional?

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email
      }
    })

    if (!userData) {
      res.status(400).json({ message: 'No user with that email address!' })
      return
    }

    const validPassword = userData.checkPassword(req.body.password)

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' })
      return
    }

    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.username = userData.name
      req.session.loggedIn = true
      res.json({ user: userData, message: 'You are now logged in!' })
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// LOGOUT
router.post('/logout', async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})

module.exports = router
