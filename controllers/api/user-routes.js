const router = require('express').Router();
const { User } = require('../../models');

// CREATE a new User and create a new session for that User
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    // if userData doesn't exists return a 404 response, else allow user to login to their session
    if (!(userData)) {
      res.status(404).json({ message: 'User can\'t be created'});
    }
    else {
      req.session.save(() => {
        req.session.user_id = userData.id
        req.session.username = userData.name
        req.session.loggedIn = true
        res.status(200).json(userData);
    });
    
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email
      }
    })

    const validPassword = userData.checkPassword(req.body.password)

    // If either doesn't exist or is false, allow user to login, else return a 404 response
    if (userData && validPassword) {
      req.session.save(() => {
        req.session.user_id = userData.id
        req.session.username = userData.name
        req.session.loggedIn = true
        res.status(200).json();
      });
    }
    else {
      res.status(400).json();
    }
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

module.exports = router;