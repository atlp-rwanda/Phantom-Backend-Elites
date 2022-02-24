const User = require(`../models/user`);
const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcrypt`);
const { object } = require("joi");
const { use } = require("chai");
const { registerValidation, loginValidation } = require(`../middlewares/auth`);

const userController = async (req, res, next) => {
  //  Validate data before user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send(`Email already exists`);

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create new user
  const user = new User({
    full_name: req.body.full_name,
    email: req.body.email,
    password: hashedPassword,
  });

  const savedUser = await user.save();
  let { password, ...userInfo } = savedUser._doc;
  res.status(201).json({ message: `user created`, userInfo });
};


// Login
const userloginController = async (req, res) => {
  //  Validate data before user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user is already in the database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send(`Email is not found`);

  // password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).json({ message: "Invalid credentilas" });

  //  create and assign token
  // const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
  //   expiresIn: "1h",
  // });
  // res.status(200).json({ token });
};

module.exports = {
  userController,
  userloginController,
};
