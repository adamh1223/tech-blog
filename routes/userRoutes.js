// routes/userRoutes.js
const router = require("express").Router();
const { User } = require("../Models");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  try {
    //const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: req.body.password,
    });
    const userPlain = user.get({ plain: true });
    req.session.save(() => {
      req.session.user_id = userPlain.id;
      req.session.logged_in = true;
      res.status(200).json(userPlain);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      console.log("User not found");
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      console.log("Incorrect password");
      res.status(400).json({ message: "Incorrect password" });
      return;
    }

    const userPlain = user.get({ plain: true });
    console.log("userPlain:", userPlain);
    req.session.save(() => {
      req.session.user_id = userPlain.id;
      req.session.logged_in = true;
      res.status(200).json({ user, message: "Logged in successfully" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
