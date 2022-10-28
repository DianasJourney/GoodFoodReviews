const router = require('express').Router();
const { Review, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try{
        const description = req.description;
        const newReview = await Review.create({...description, user_id })
        res.json(newReview);
    }
    catch(err) {
        res.status(500).json(err);
    }
})


//updating our posted review
router.put('/:id', withAuth, async (req, res) => {
    try{
        const reviewPost = await Review.update(req.body, {
            where: {
                id: req.params.id
            }
        })
          if (reviewPost > 0) {
            res.status(200).end();
        } else {
            res.status(400).end();
        } 
    } catch (err) {
      res.status(500).json(err);
    }
    
});

//deleting any of our reviews
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const reviewPost = await Review.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    }); 

    if (reviewPost > 0) {
      res.status(200).end()
    } else {
      res.status(404).json({ message: 'No review found with this id!'})
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

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

module.exports = router;