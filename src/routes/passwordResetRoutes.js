import express from "express";
// import isAdmin from "../middleware/isAdmin.js";
const router = express.Router();
import ResetTokenController from '../controllers/resetPasswordController.js'
import validate from '../middleware/validator'
router.post("/link",  new ResetTokenController().createResetLink)
router.post("/new-password", validate.resetPassword, new ResetTokenController().resetPassword)
router.get("/verify-token", new ResetTokenController().isResetTokenValid, (req, res) => {
    res.json({success: true})
})



export default router