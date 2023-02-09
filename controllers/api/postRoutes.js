const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//create comment for a post
router.post('/comments', async (req, res) => {
    console.log("-----IN COMMENT-----")
    console.log(req.body.comment + "----------")
    console.log(req.body.user + "-----IN COMMENT-----")
    console.log(req.body.post_id + "-----IN COMMENT-----")

    try {
      const newComment = await Comment.create({
        comment: req.body.comment,
        post_id: req.body.post_id,
        user_id: req.session.user,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(500).json('Internal Server Error');
    }
  });

module.exports = router;
