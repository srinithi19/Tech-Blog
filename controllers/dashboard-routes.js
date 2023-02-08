const router = require('express').Router();
const { Post, User , Comment} = require('../models');
const withAuth = require('../utils/auth');

router.use(withAuth);

//get all posts for a loggedin user
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts belongs to specific user
router.get("/:user", withAuth, async (req, res) => {
    try {
      const dbBlogDataByUser = await Post.findAll({
        where: {
            user_id: req.params.user_id,
        },
      });
      const posts = dbBlogDataByUser.map((post) => post.get({ plain: true }));
      res.render("dashboard", {
        posts,
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id,
        name: req.session.name,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router;
