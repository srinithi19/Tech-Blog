const router = require('express').Router();
const { User } = require('../../models');

//create new user
router.post("/signup", async (req,res) => {
  console.log("IN SIGNUP")
  console.log(req.body.username)
  console.log(req.body.password)

    try {
        const dbUserData = await User.create({
          name: req.body.username,
          password: req.body.password,
        });
        console.log("USER DATA" + dbUserData)
        const data = dbUserData.get({ plain: true });    
        req.session.save(() => {
          req.session.user = data.id;
          req.session.username = data.name;
          req.session.loggedIn = true;
          res.status(200).json(dbUserData);
        });
      } catch (error) {
        res.status(500).json(error);
      }
})

//login
router.post("/login", async (req, res) => {
    try {
      const dbUserData = await User.findOne({
        where: { name: req.body.username },
      });
      if (!dbUserData) {
        res.status(400).json({ message: "Incorrect username or password. Please try again!" });
        return;
      }
      const data = dbUserData.get({ plain: true });
      const validPassword = dbUserData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: "Incorrect username or password. Please try again!" });
        return;
      }
      req.session.save(() => {
        //save user for session
        console.log('------------------')
        console.log(`-------- ${req.session.username}----------`)
        console.log('------------------')
        req.session.username = data.name;
        req.session.user = data.id;
        req.session.loggedIn = true;
  
        res.status(200).json({ user: dbUserData, message: "You are now logged in!" });
      });
    } catch (error) {
      res.status(500).json(error);
    }
  });

//logout
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;
