const router = require("express").Router();

// Import controllers
const userRoutes = require("../Controller/userRoutes");
const blogPostRoutes = require("../Controller/blogPostRoutes");
const commentRoutes = require("../Controller/commentRoutes");

// Define routes
router.use("/users", userRoutes);
router.use("/blogposts", blogPostRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
