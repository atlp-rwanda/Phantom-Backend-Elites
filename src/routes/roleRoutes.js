import express from "express";
import isAdmin from "../middlewares/isAdmin.js";
const router = express.Router();
import roleController from '../controllers/RoleController.js'
router.post("/", isAdmin, new roleController().createRole)
router.get("/", isAdmin, new roleController().findAllRoles)
router.put("/:id", isAdmin, new roleController().updateRole)
router.delete("/:id", isAdmin, new roleController().deleteRole)
router.get("/:id", isAdmin, new roleController().findOneRole)

export default router