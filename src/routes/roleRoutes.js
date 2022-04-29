import express from "express";
import isAdmin from "../middleware/isAdmin.js";
const router = express.Router();
import roleController from '../controllers/RoleController.js'
import validate from '../middleware/validator'
router.post("/", new roleController().createRole)
router.get("/", new roleController().findAllRoles)
router.put("/:id",validate.updateRole, isAdmin, new roleController().updateRole)
router.delete("/:id", new roleController().deleteRole)
router.get("/:id", new roleController().findOneRole)

export default router