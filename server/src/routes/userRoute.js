const router = require("express").Router();
const tokenHandler = require("../handlers/tokenHandler");
const { userController } = require("../controllers");

router.post("/", tokenHandler.verifyAdminToken, userController.create);

router.get("/", tokenHandler.verifyAdminToken, userController.getAll);

router.get("/:id", tokenHandler.verifyAdminToken, userController.getOne);

router.put("/:id", tokenHandler.verifyAdminToken, userController.update);

router.delete("/:id", tokenHandler.verifyAdminToken, userController.delete);

module.exports = router;
