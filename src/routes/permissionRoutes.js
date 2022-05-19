import express from "express";
import isAdmin from "../middleware/isAdmin.js";
import validate from '../middleware/validator'
const router = express.Router();
import permissionController from '../controllers/PermissionController.js'
router.post("/", isAdmin, validate.createPermission, new permissionController().createPermission)
router.get("/", isAdmin, new permissionController().findAllPermissions)
router.put("/:id", isAdmin,validate.updatePermission, new permissionController().updatePermission)
router.delete("/:id", isAdmin, new permissionController().deletePermission)
router.get("/:id", isAdmin, new permissionController().findOnePermission)

export default router