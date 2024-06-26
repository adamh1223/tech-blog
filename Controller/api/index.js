const UserRoutes = require("./userRoutes");
const router = require("express").Router();

router.use("/users", UserRoutes);

module.exports = router;
