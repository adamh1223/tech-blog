const router = require("express").Router();

// Import controllers
const userRoutes = require("./userRoutes");
const blogPostRoutes = require("./blogPostRoutes");
const commentRoutes = require("./commentRoutes");
const dashboardRoutes = require("../Controller/dashboardRoutes");

// Define routes
router.use("/users", userRoutes);
router.use("/blogposts", blogPostRoutes);
router.use("/api", commentRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
