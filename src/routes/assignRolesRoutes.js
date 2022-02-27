import express from "express";

const router = express.Router();
import assignmentController from '../controllers/assignUserRoleController.js'
router.post("/", new assignmentController().assign)
router.get("/", new assignmentController().findAllAssignRoles)
router.put("/:id", new assignmentController().updateAssignRole)
router.delete("/:id", new assignmentController().deleteAssignRole)
router.get("/:id", new assignmentController().findOneAssignRole)

export default router