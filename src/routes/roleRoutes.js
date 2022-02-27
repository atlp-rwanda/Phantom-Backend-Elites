import express from "express";

const router = express.Router();
import roleController from '../controllers/RoleController.js'
router.post("/", new roleController().createRole)
router.get("/", new roleController().findAllRoles)
router.put("/:id", new roleController().updateRole)
router.delete("/:id", new roleController().deleteRole)
router.get("/:id", new roleController().findOneRole)

export default router