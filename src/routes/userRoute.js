import express from 'express'
import userController from '../controllers/userController'
// import auth from '../middlewares/auth'

const router = express.Router();

// userRoute.post('/signin',new userController().login);
router.post('/',new userController().createUser);
router.get('/',new userController().findAllUsers);
router.get('/:id',new userController().findOneUser);
router.put('/:id',new userController().updateUser);
router.delete('/:id',new userController().deleteUser);

export {router as default};