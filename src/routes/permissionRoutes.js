import express from "express";
import validate from '../middlewares/validator'
const router = express.Router();
import permissionController from '../controllers/PermissionController.js'
router.post("/", validate.createPermission, new permissionController().createPermission)
router.get("/", new permissionController().findAllPermissions)
router.put("/:id",validate.updatePermission, new permissionController().updatePermission)
router.delete("/:id", new permissionController().deletePermission)
router.get("/:id", new permissionController().findOnePermission)

export default router