import express from "express";

const router = express.Router();
import assignmentController from '../controllers/assignRolePermissionsController.js'
router.post("/", new assignmentController().assign)
router.get("/", new assignmentController().findAllAssignPerms)
router.put("/:id", new assignmentController().updateAssignPerm)
router.delete("/:id", new assignmentController().deleteAssignPerm)
router.get("/:id", new assignmentController().findOneAssignPerm)

export default router