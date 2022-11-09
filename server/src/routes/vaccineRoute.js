const router = require("express").Router();
const tokenHandler = require("../handlers/tokenHandler");
const { vaccineController, vaccineLotController } = require("../controllers");

// place created by user
router.post("/", tokenHandler.verifyAdminToken, vaccineController.create);

router.get("/", tokenHandler.verifyAdminToken, vaccineController.getAll);

router.get("/:id", tokenHandler.verifyToken, vaccineController.getOne);

router.put("/:id", tokenHandler.verifyToken, vaccineController.update);

router.delete("/:id", tokenHandler.verifyToken, vaccineController.delete);

// vaccine lot

router.post(
  "/lots",
  tokenHandler.verifyAdminToken,
  vaccineLotController.create
);

router.get(
  "/lots/all",
  tokenHandler.verifyAdminToken,
  vaccineLotController.getAll
);

router.get(
  "/lots/:id",
  tokenHandler.verifyAdminToken,
  vaccineLotController.getOne
);

router.put(
  "/lots/:id",
  tokenHandler.verifyAdminToken,
  vaccineLotController.update
);

router.delete(
  "/lots/:id",
  tokenHandler.verifyAdminToken,
  vaccineLotController.delete
);

module.exports = router;
