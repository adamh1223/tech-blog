const router = require("express").Router();

// Import controllers
const userRoutes = require("./userRoutes");
const blogPostRoutes = require("./blogPostRoutes");
const commentRoutes = require("./commentRoutes");

// Define routes
router.use("/users", userRoutes);
router.use("/blogposts", blogPostRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
