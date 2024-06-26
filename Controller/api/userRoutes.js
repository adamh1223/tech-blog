const router = require("express").Router();
const { User } = require("../../Models/index");

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.status(200).json(user);
});

router.post("/", async (req, res) => {
  const user = await User.findOne({
    where: {
      user_name: req.body.user_name,
    },
  });
  if (!user) {
    res.status(404).json("User not found");
  }
  const isPasswordCorrect = await user.checkPassword(req.body.user_password);
  if (!isPasswordCorrect) {
    res.status(400).json("Incorrect password");
  }
});

module.exports = router;
