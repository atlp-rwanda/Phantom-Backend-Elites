const express = require("express");
const operatorController = require("./operatorControllers");

const router = express.Router();

router.get("/", operatorController.getoperators);
router.get("/:id", operatorController.getoperatorById);
router.post("/", operatorController.addoperator);
router.delete("/:id", operatorController.removeoperator);
router.put("/:id", operatorController.updateoperator);

module.exports = router;
