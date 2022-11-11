const router = require("express").Router();
const { adminController } = require("../controllers");
const { verifyAdminToken } = require("../handlers/tokenHandler");

router.post("/login", adminController.login);

router.get("/summary", verifyAdminToken, adminController.summary);

router.post("/check-token", verifyAdminToken, (req, res) => {
  res.status(200).json("Authorized");
});

module.exports = router;
