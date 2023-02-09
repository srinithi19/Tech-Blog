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

  router.get('/edit/:id', async (req, res) => {
    console.log("------in EDIT--------")
    try {
      const postData = await Post.findByPk(req.params.id);
      if (!postData) {
        res.status(404).json({ message: 'No post with that id.' });
        return;
      }
      const post = postData.get({ plain: true });
      res.render('edit-post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //Delete a post by its ID
  router.delete('/delete/:id', withAuth, async (req, res) => {
    console.log("-------in DELETE---------")
    console.log(req.params.id + "-------in DELETE---------")

    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      console.log("Data to be DELETED: ", postData);
      if (!postData) {
        res.status(400).json({ message: "Id does not exist!" });
        return;
      }
      res.status(200).json(postData);
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  });

  //update a post
  router.put("/update/:id", withAuth, async (req, res) => {
    console.log("-------in UDATE POST---------")

    try {
      const postData = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      console.log(postData);
      if (!postData) {
        res.status(404).json({ message: "Not exists " });
        return;
      }
      res.status(200).json(postData);
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router;
