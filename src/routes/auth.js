
import AuthController from '../controllers/authController';
import express from 'express'
import Validate from '../middlewares/validator'
const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post: 
 *     tags: ["Phantom Signin"]
 *     description: "Provide security to phantom application by against unknown user and allow only who has the right to use our application" 
 *     operationId: "createTodo"
 *     summary: "return user data after insertion"
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
 *     requestBody: 
 *       content: 
 *         "application/json": {}
 *     responses: 
 *       201: 
 *           description: "A User object"
 *           schema:
 *               properties:
 *                   id:
 *                     type: integer
 *                     example: 4
 *                   name:
 *                      type: string
 *                      example: "Rwema ngabo"
 *                   email:
 *                      type: string
 *                      example: "rwema@gmail.com"
 *       500: 
 *         description: "Server error"
 *   
 */
router.post('/login', Validate.loginFields, AuthController.login);
router.post('/logout', AuthController.logout);

export { router as default };
