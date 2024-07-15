const router = require("express").Router();

// Import individual route handlers
const apiRoutes = require("./api");
const dashboardRoutes = require("../Controller/dashboardRoutes");
const commentRoutes = require("./commentRoutes");
const blogPostRoutes = require("./blogPostRoutes");
const userRoutes = require("./userRoutes");

// Prefix routes
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/comments", commentRoutes);
router.use("/blogposts", blogPostRoutes);
router.use("/users", userRoutes);

module.exports = router;
