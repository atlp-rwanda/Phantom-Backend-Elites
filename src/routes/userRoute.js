import express from 'express'
const multer = require('multer');
const path = require('path');
const fs = require('fs');
import userController from '../controllers/userController'
import canUpdateProfile from '../middleware/canUpdateProfile';
import isAdmin from '../middleware/isAdmin';
import Validate from '../middleware/validator'

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Unsupported files'), false)
  }
}

  
  const uploadImg = multer({storage: storage}).single('profilePic');

/**
 * @swagger
 * /api/v1/users:
 *   post: 
 *     tags: ["Phantom Signup"]
 *     description: "To signup in phantom app you have to the provide information, User should be Driver or Operator or Administrator only " 
 *     operationId: "Register User"
 *     summary: "Register User"
 *     produces: 
 *          "application/json"
 *            
 *     parameters: 
 *         - name : body
 *           in : body
 *           schema:
 *               properties:
 *                   email: 
 *                       type: string
 *                       format: string
 *                       example: "admin@test.com"
 *                   password:
 *                       type: string
 *                       format : string
 *                       example: "password"
 *                   firstName: 
 *                       type: string
 *                       format: string
 *                       example: "Rwema"
 *                   lastName:
 *                       type: string
 *                       format : string
 *                       example: "chris"
 *                   roleId: 
 *                       type: string
 *                       format: string
 *                       example: "1"
 *                   dateofbirth:
 *                       type: string
 *                       format : string
 *                       example: "1-1-1990"
 *                   gender: 
 *                       type: string
 *                       format: string
 *                       example: "male"
 *                   adress:
 *                       type: string
 *                       format : string
 *                       example: "kigali"
 *     requestBody: 
 *       content: 
 *         "application/json": {}
 *     responses: 
 *       201: 
 *           description: "A User object"
 *           schema:
 *               properties:
 *                   email: 
 *                       type: string
 *                       format: string
 *                       example: "admin@test.com"
 *                   password:
 *                       type: string
 *                       format : string
 *                       example: "password"
 *                   firstName: 
 *                       type: string
 *                       format: string
 *                       example: "Rwema"
 *                   lastName:
 *                       type: string
 *                       format : string
 *                       example: "chris"
 *                   roleId: 
 *                       type: string
 *                       format: string
 *                       example: "1"
 *                   dateofbirth:
 *                       type: string
 *                       format : string
 *                       example: "1-1-1990"
 *                   gender: 
 *                       type: string
 *                       format: string
 *                       example: "male"
 *                   adress:
 *                       type: string
 *                       format : string
 *                       example: "kigali"
 *       500: 
 *         description: "Server error"
 *   
 */

router.post('/',Validate.userFields, new userController().createUser);
router.get('/',new userController().findAllUsers);
router.get('/:id',new userController().findOneUser);
router.put('/profiles/:id',uploadImg, new userController().updateProfile);
router.delete('/:id',new userController().deleteUser);

export {router as default};