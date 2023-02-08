const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET all blogs and render to 'homepage' 
router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [User],
      });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET blog by ID and render to 'post'
  router.get('/post/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [{ model: User }, { model: Comment, include: [User] }],
      });
      if (!postData) {
        res.status(404).json({ message: 'No post with that id.' });
        return;
      }
      const post = postData.get({ plain: true });
      res.render('post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/signup', (req, res) => {
    res.render('signup');
  });
  
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

module.exports = router;
