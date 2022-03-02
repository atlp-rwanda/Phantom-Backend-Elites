import express from "express";
// import isAdmin from "../middleware/isAdmin.js";
const router = express.Router();
import ResetTokenController from '../controllers/resetPasswordController.js'
router.post("/link",  new ResetTokenController().createResetLink)
router.post("/new-password",  new ResetTokenController().resetPassword)


export default router