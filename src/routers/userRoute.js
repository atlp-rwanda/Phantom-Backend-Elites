import express from 'express'
import userController from '../controllers/userController'
import auth from '../middleware/auth'

const userRoute = express.Router();

userRoute.post('/signin',new userController().login);

export {userRoute as default};