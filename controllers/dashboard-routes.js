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

  //update a post
  router.put("/update/:id", withAuth, async (req, res) => {
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
  

  //Delete a post by its ID
  router.delete("/:id", async (req, res) => {
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
      res.status(500).json(error);
    }
  });
module.exports = router;
