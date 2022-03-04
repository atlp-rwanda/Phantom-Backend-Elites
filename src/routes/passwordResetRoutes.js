import express from "express";
// import isAdmin from "../middlewares/isAdmin.js";
const router = express.Router();
import ResetTokenController from '../controllers/resetPasswordController.js'
router.post("/",  new ResetTokenController().resetPassword)


export default router