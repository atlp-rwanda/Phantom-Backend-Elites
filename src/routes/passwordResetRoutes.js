import express from "express";
import validate from '../middlewares/validator'
const router = express.Router();
import ResetTokenController from '../controllers/resetPasswordController.js'
router.post("/",validate.resetPassword,  new ResetTokenController().resetPassword)


export default router