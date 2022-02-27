import express from "express";

const router = express.Router();
import permissionController from '../controllers/PermissionController.js'
router.post("/", new permissionController().createPermission)
router.get("/", new permissionController().findAllPermissions)
router.put("/:id", new permissionController().updatePermission)
router.delete("/:id", new permissionController().deletePermission)
router.get("/:id", new permissionController().findOnePermission)

export default router