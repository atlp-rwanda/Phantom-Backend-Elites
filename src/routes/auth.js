
import AuthController from '../controllers/authController';
import express from 'express'
const router = express.Router();

// router.get('/logout', new AuthController.logout);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);


// export default router;
export { router as default };
