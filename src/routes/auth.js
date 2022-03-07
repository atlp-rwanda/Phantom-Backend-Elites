
import AuthController from '../controllers/authController';
import express from 'express'
import Validate from '../middlewares/validator'
const router = express.Router();

// router.get('/logout', new AuthController.logout);
router.post('/login', Validate.loginFields, AuthController.login);


// export default router;
export { router as default };
