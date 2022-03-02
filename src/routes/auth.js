import { Router } from 'express';
import authController from '../controllers/authController';
export default router;
import logout from '../controllers/authController';
const router = Router();

router.get('/logout', authController.logout);



router.get('/logout', logout);

// export default router;
export { router as default };
