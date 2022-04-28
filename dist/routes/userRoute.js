"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _canUpdateProfile = _interopRequireDefault(require("../middleware/canUpdateProfile"));

var _isAdmin = _interopRequireDefault(require("../middleware/isAdmin"));

var _validator = _interopRequireDefault(require("../middleware/validator"));

const router = _express.default.Router();
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


exports.default = router;
router.post('/', _validator.default.userFields, new _userController.default().createUser);
router.get('/', new _userController.default().findAllUsers);
router.get('/:id', new _userController.default().findOneUser);
router.put('/profiles/:id', _canUpdateProfile.default, new _userController.default().updateProfile);
router.delete('/:id', new _userController.default().deleteUser);