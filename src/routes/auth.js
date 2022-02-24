import { Router } from 'express';
import authController from '../controllers/authController';
const router = Router();

router.get('/logout', authController.logout);

export default router;