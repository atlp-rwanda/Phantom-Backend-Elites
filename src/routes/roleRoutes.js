import express from "express";

const router = express.Router();
import {
    createRole,
    updateRole, 
    deleteRole,
     findAllRoles, 
     findOneRole } from '../controllers/RoleController.js'
router.post("/", createRole)
router.get("/", findAllRoles)
router.post("/:id", updateRole)
router.post("/:id", deleteRole)
router.post("/:id", findOneRole)

export default router