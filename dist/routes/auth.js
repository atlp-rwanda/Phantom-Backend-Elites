"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authController = _interopRequireDefault(require("../controllers/authController"));

var _express = _interopRequireDefault(require("express"));

var _validator = _interopRequireDefault(require("../middleware/validator"));

const router = _express.default.Router();
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


exports.default = router;
router.post('/login', _validator.default.loginFields, _authController.default.login);
router.post('/logout', _authController.default.logout);