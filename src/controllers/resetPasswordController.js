import crypto from 'crypto'
import sendEmail from '../services/sendEmail.js'
import bcrypt from 'bcrypt'
import {User} from '../../sequelize/models'
import {ResetToken} from '../../sequelize/models'


class ResetTokenController{

  async createResetLink(req, res) {
    
  let user = await User.findOne({where: { email: req.body.email }});
  if (!user) return res.status(400).json({message: 'User can not be found!'});
  let fpSalt = crypto.randomBytes(64).toString('base64');
  let expireDate = new Date(new Date().getTime() + (60 * 60 * 1000))
  const previousToken = await ResetToken.findOne({where: {email: user.email}});
 if(previousToken) {
   await ResetToken.destroy({ where: { email: req.body.email}});
  }
  const data = await ResetToken.create({
        email: user.email, expiration: expireDate, token: fpSalt, used: 0
      })
  const message = `
      <p>To reset your password, please click the link below.</p>
      <a href="http://${process.env.DOMAIN}api/v1/reset-password?token=${encodeURIComponent(data.token)}&email=${data.email}"> Reset Password </a>
      <p>Or use the following token</p>
      ${data.token}
      `;
  sendEmail(message, data.email);
  res.status(200).json({message: `Your password reset link has successfully been sent to your email ${data.email}`,token:`${data.token}`})
  return data
}

async resetPassword(req, res) {
  try{
  let tokenData = await ResetToken.findOne({ where: { token: req.body.token }})
  console.log(tokenData.email)
  if (!tokenData) {
   return res.status(404).json({message: 'Token has expired. Please try password reset again.'});
  }
  if (!req.body.password && !req.body.confirmPassword && !req.body.token) {
    return res.status(400).json({status: 'error', message: 'Password and reset-token should be provided. Please try again.'});
  }
  if(req.body.password === req.body.confirmPassword){

  let newPassword = await bcrypt.hash(req.body.password, 12)
  console.log(newPassword)
  await User.update({password: newPassword},{where: {email: tokenData.email}});
  return res.json({status: 'ok', message: 'Password reset. Please login with your new password.'});
}}catch(err){
  return res.status(500).json({status: 'error', message: 'An error occured while trying to reset the password.'});
}

}}
export {ResetTokenController as default}