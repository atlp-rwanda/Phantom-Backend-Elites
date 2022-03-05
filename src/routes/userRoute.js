import express from 'express'
import userController from '../controllers/userController'
import isAdmin from '../middleware/isAdmin';
// import auth from '../middleware/auth'

const router = express.Router();

// userRoute.post('/signin',new userController().login);
router.post('/', isAdmin, new userController().createUser);
router.get('/',isAdmin,new userController().findAllUsers);
router.get('/:id',isAdmin,new userController().findOneUser);
router.put('/:id',isAdmin,new userController().updateUser);
router.delete('/:id',new userController().deleteUser);

export {router as default};