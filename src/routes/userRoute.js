import express from 'express'
import userController from '../controllers/userController'
import canUpdateProfile from '../middleware/canUpdateProfile';
import isAdmin from '../middleware/isAdmin';
// import auth from '../middleware/auth'

const router = express.Router();

// userRoute.post('/signin',new userController().login);
router.post('/', isAdmin, new userController().createUser);
router.get('/',isAdmin,new userController().findAllUsers);
router.get('/:id',new userController().findOneUser);
router.put('/profile/update/:id',canUpdateProfile,new userController().updateProfile);
router.delete('/:id',new userController().deleteUser);

export {router as default};