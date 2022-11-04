const router = require("express").Router();

/* GET home page. */
router.use("/admin", require("./adminRoute"));
router.use("/user", require("./userRoute"));
router.use("/place", require("./placeRoute"));

module.exports = router;
