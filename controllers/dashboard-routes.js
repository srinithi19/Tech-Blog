const router = require('express').Router();
const { Post, User , Comment} = require('../models');
const withAuth = require('../utils/auth');

router.use(withAuth);

//get all posts for a loggedin user
router.get('/', async (req, res) => {
  console.log('------------------')
  console.log("userid" + req.session.user)
  console.log('------------------')

  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user },
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user,
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
        user_id: req.session.user,
        name: req.session.username,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.get("/addPost", async (req, res) => {
    return res.render("add-post", {
      user_id: req.session.user,
      loggedIn: req.session.loggedIn,
    });
  });

  //create a new post
  router.post("/addPost", withAuth, async (req, res) => {
    try {
      const dbPostData = await Post.create({
        title: req.body.title,
        post_content: req.body.content,
        user_id: req.session.user,
      });
      res.status(200).json(dbPostData);
    } catch (error) {
      res.status(400).json(error);
    }
  });
  

  router.get("/update/:id" , async (req,res)=> {
    return res.render("edit-post", {
      user_id: req.session.user,
      loggedIn: req.session.loggedIn,
    });
  })

  
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

  
module.exports = router;
