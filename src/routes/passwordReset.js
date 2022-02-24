const { User } = require("../models/user");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const jwt = require(`jsonwebtoken`);
const verify = require(`./verifyToken`);
const bcrypt = require(`bcrypt`);
const express = require("express");
const router = express.Router();

router.post("/forgot", async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");
        const token  = jwt.sign({userId: user._id}, process.env.TOKEN_SECRET);
        res.header(`auth-token`, token).send(token);

const email = `
<h2>Password reset<h2>
<p>If you've lost your password or wish to reset it on phantom,<br> use the link below</p>
<a href="#" style="font-size: 1rem;">Reset password</a>
<br>
<p>If you did not request a password reset, you can safely ignore this email.<br>
Only a person with access to your email can reset your account password</p>
`
        await sendEmail(email, user.email);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

router.post("/reset", verify, async (req, res) => {
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findById( req.body.email);
        if (!user) return res.status(400).send("invalid link or expired");

        user.password = req.body.password;
        await user.save();
    

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});



module.exports = router;