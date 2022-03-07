import Users from '../../sequelize/models/User'
import { development } from "../../sequelize/config/config.js";
import { Sequelize } from "sequelize";
import crypto from 'crypto'
import sendEmail from '../services/sendEmail.js'
import bcrypt from 'bcrypt'
const Op = Sequelize.Op;
let sequelize = new Sequelize(development);
import ResetTokens from '../../sequelize/models/ResetToken'
let ResetToken = ResetTokens(sequelize, Sequelize);
let User = Users(sequelize, Sequelize);

class ResetTokenController{

    // async forgotPassword(req, res){
    //     res.render('user/forgot-password', { });
    // }

    async createResetLink(req, res) {

         //ensure that you have a user with this email
  let user = await User.findOne({where: { email: req.body.email }});
 
  
  const email = user.email
  if (email == null) {
  /**
   * we don't want to tell attackers that an
   * email doesn't exist, because that will let
   * them use this form to find ones that do
   * exist.
   **/
    return res.json({status: 'ok'});
  }

  /**
   * Expire any tokens that were previously
   * set for this user. That prevents old tokens
   * from being used.
   **/
         //Create a random reset token
let fpSalt = crypto.randomBytes(64).toString('base64');

//token expires after one hour
let expireDate = new Date(new Date().getTime() + (60 * 60 * 1000))
 
//insert token data into DB

   const previousToken = await ResetToken.findOne({where: {email: req.body.email}});

   if (previousToken){
    await ResetToken.destroy({
        where: {
          email: req.body.email
        }
    });

    ResetToken.create({
        email: email,
        expiration: expireDate,
        token: fpSalt,
        used: 0
      }).then(data => {
          //create email
      const message = `
      
      <p>To reset your password, please click the link below.</p>
      
      <a href="http://${process.env.DOMAIN}api/v1/reset-password?token=${encodeURIComponent(data.token)}&email=${data.email}"> Reset Password </a>
      <p>Or use the following token</p>
      ${data.token}
      `;
      
      sendEmail(message, data.email);
      res.status(200).json({message: `Your password reset link has successfully been sent to your email ${data.email}`})
      return data
      })
   }else{
    ResetToken.create({
        email: email,
        expiration: expireDate,
        token: fpSalt,
        used: 0
      }).then(data => {
          //create email
      const message = `
      
      <p>To reset your password, please click the link below.</p>
      
      <a href="http://${process.env.DOMAIN}api/v1/reset-password?token=${encodeURIComponent(data.token)}&email=${data.email}"> Reset Password </a>
      <p>Or use the following token</p>
      ${data.token}
      `;
      
      sendEmail(message, data.email);
      res.status(200).json({message: `Your password reset link has successfully been sent to your email ${data.email}`})
      return data


      })
}}



async resetPassword(req, res) {

  //find the token
  let token = await ResetToken.findOne({
    where: {
      token: req.body.token,
    }
  })
   

  if (!token) {
   res.status(404).json({message: 'Token has expired. Please try password reset again.'});
  }

  //compare passwords
  if (!req.body.password && !req.body.confirmPassword && !req.body.token && record.token!==req.body.token ) {
    return res.json({status: 'error', message: 'Password and reset-token should be provided. Please try again.'});
  }else{

    if(req.body.password === req.body.confirmPassword){
    let newPassword = bcrypt.hash(req.body.password, 12)
   
    await User.update({
      password: newPassword,
      
    },
    {
      where: {
        email: token.email
      }
    });
    return res.json({status: 'ok', message: 'Password reset. Please login with your new password.'});

  }else{
    return res.json({status: 'error', message: 'Password and confirmPassword should be equivalent!'});
  }
}
}
}
export {ResetTokenController as default}
 