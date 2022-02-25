import { Router } from 'express';
import logout from '../controllers/authController';
const router = Router();

router.get('/logout', logout);

// export default router;
export { router as default };
