const router = require("express").Router();
const { BlogPost, User, Comment } = require("../Models");

// Import individual route handlers
const apiRoutes = require("./api");

// Prefix routes
router.use("/api", apiRoutes);

//put in homeroutes
router.get("/", (req, res) => {
  res.render("home");
});
router.get("/blogpost", (req, res) => {
  res.render("blogPost");
});
router.get("/dashboard", async (req, res) => {
  const blogPostData = await BlogPost.findAll({
    include: [{ model: User, attributes: ["user_name"] }, { model: Comment }],
  });
  res.render("dashboard", {
    blogPosts: blogPostData,
  });
});

//do this for all handlebars pages^

module.exports = router;
