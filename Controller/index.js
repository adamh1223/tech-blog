const router = require("express").Router();

const apiRoutes = require("./api");
const dashboardRoutes = require("./dashboardRoutes");

router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
