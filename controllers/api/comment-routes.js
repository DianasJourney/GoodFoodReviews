const router = require("express").Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// Asynchronously CREATE a new Comment using the session's user_id and 
// the selected review's id
router.post('/', withAuth, async (req, res) => {
    try{
        const newComment = await Comment.create({
            user_id: req.session.user_id,
            body: req.body.body,
            review_id: req.body.review_id
         })
        res.json(newComment);
    }
    catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;