import ResetTokens from '../../sequelize/models/Permission'
import Users from '../../sequelize/models/User'
import { development } from "../../sequelize/config/config.js";
import { Sequelize } from "sequelize";
import crypto from 'crypto'
import sendEmail from '../services/sendEmail.js'
let sequelize = new Sequelize(development);
let ResetToken = ResetTokens(sequelize, Sequelize);
let User = Users(sequelize, Sequelize);

class ResetTokenController{

    async resetPassword(req, res) {

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
   await ResetToken.update({
    used: 1
  },
  {
    where: {
      email: req.body.email
    }
});

//Create a random reset token
let fpSalt = crypto.randomBytes(64).toString('base64');

//token expires after one hour
let expireDate = new Date(new Date().getTime() + (60 * 60 * 1000))
 
//insert token data into DB
await ResetToken.create({
  email: req.body.email,
  expiration: expireDate,
  token: fpSalt,
  used: 0
});

//create email
const message = {

    text: 'To reset your password, please click the link below.\n\nhttp://'+process.env.DOMAIN+'/reset-password?token='+encodeURIComponent(token)+'&email='+req.body.email
}

sendEmail(message, req.body.email);
  
}}
export {ResetTokenController as default}
 