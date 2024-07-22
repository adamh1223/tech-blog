const router = require("express").Router();
const { BlogPost, User, Comment } = require("../Models");
const withAuth = require("../utils/auth");

// Import individual route handlers
const apiRoutes = require("./api");

// Prefix routes
router.use("/api", apiRoutes);

//put in homeroutes
router.get("/", (req, res) => {
  res.render("home", {
    logged_in: req.session.logged_in,
  });
});
router.get("/blogpost", (req, res) => {
  res.render("blogPost");
});
router.get("/dashboard", async (req, res) => {
  const blogPostData = await BlogPost.findAll({
    include: [{ model: User, attributes: ["name"] }, { model: Comment }],
  });
  const blogPosts = blogPostData.map((blogPost) => {
    return blogPost.get({ plain: true });
  });
  res.render("dashboard", {
    blogPosts: blogPosts,
    logged_in: req.session.logged_in,
  });
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
    });

    if (!userData) {
      return res.status(400).json({ message: "No users found" });
    }

    const users = userData.map((project) => project.get({ plain: true }));

    return res.render("homepage", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//do this for all handlebars pages^

module.exports = router;
