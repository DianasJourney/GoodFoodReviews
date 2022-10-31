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
    (!userData) 
    ? res.status(404).end()
    :req.session.save(() => {
      req.session.user_id = userData.dataValues.id
      req.session.name = userData.dataValues.name
      req.session.loggedIn = true
  });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN Handling - allow users to login if their credentials are valid
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    const validPassword = userData.checkPassword(req.body.password);

    // If either doesn't exist or is false, return a 404 response, else allow user to login
    !(userData && validPassword) 
    ? res.status(404).end()
    : req.session.save(() => {
      req.session.user_id = userData.id
      req.session.username = userData.name
      req.session.loggedIn = true
      res.status(200).end()
  });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGOUT Handling - redirect 
router.post('/logout', async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    })
  } else {
    res.status(404).end();
  }
});

module.exports = router;