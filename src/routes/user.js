const express = require(`express`);
const { verify } = require("jsonwebtoken");
const userController = require(`../controlers/user`);
const { asyncHandler } = require("../middlewares/auth");
const router = express.Router();

router.post(`/signup`, asyncHandler(userController.userController));

router.post(`/login`, asyncHandler(userController.userloginController));

module.exports = router;
