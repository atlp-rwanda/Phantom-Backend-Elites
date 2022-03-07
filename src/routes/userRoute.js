import express from 'express'
import userController from '../controllers/userController'
import isAdmin from '../middlewares/isAdmin';
import Validate from '../middlewares/validator'
// import auth from '../middlewares/auth'

const router = express.Router();

/**
 * @swagger
 * /api/v1/users/:
 *   post: 
 *     tags: ["Phantom Signin"]
 *     description: "To signup in phantom app you have to the follow information " 
 *     operationId: "createTodo"
 *     summary: "Register User"
 *     produces: 
 *          "application/json"
 *            
 *     parameters: 
 *         - name : body
 *           in : body
 *           schema:
 *               properties:
 *                   firstName: 
 *                       type: string
 *                       format: string
 *                       example: "Rwema"
 *                   lastName:
 *                       type: string
 *                       format : string
 *                       example: "chris"
 *                  email: 
 *                       type: string
 *                       format: string
 *                       example: "admin@test.com"
 *                   password:
 *                       type: string
 *                       format : string
 *                       example: ""
 *                  roleId: 
 *                       type: string
 *                       format: string
 *                       example: "1"
 *                   dateofbirth:
 *                       type: string
 *                       format : string
 *                       example: "1-1-1990"
 *                  gender: 
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
 *                   firstName:
 *                     type: integer
 *                     example: "Rwema"
 *                   lastname:
 *                      type: string
 *                      example: "ngabo"
 *                   email:
 *                      type: string
 *                      example: "rwema@gmail.com"
 *       500: 
 *         description: "Server error"
 *   
 */
router.post('/',Validate.userFields, isAdmin, new userController().createUser);
router.get('/',isAdmin,new userController().findAllUsers);
router.get('/:id',isAdmin,new userController().findOneUser);
router.put('/:id',isAdmin,new userController().updateUser);
router.delete('/:id',new userController().deleteUser);

export {router as default};