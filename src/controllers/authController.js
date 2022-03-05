import token from '../../src/helpers/generateToken';
import verify from '../../src/helpers/verifyToken'
import Users from '../../sequelize/models/User'
import Tokens from '../../sequelize/models/Token'
import { development } from "../../sequelize/config/config.js";
import { Sequelize, where } from "sequelize";
import bcrypt from 'bcrypt'
import ResetTokens from '../../sequelize/models/ResetToken'

let sequelize = new Sequelize(development);
import Profiles from "../../sequelize/models/profile";
let Profile = Profiles(sequelize, Sequelize);
let ResetToken = ResetTokens(sequelize, Sequelize);
let User = Users(sequelize, Sequelize);
let Token = Tokens(sequelize, Sequelize)
//User login
class AuthController{
    async login(req, res) {
    
  // try {
      const user = await User.findOne({ where: {email: req.body.email }});
      if(!user) return res.status(400).json({message: "Wrong email detected!"});
     
          
      
      if (user.password===req.body.password)
      {
        // console.log(`Password from database  ${user.password}`)
        // console.log(`Password from user  ${req.body.password}`)
      
                  // JSON WEB TOKEN FOR ATHENTICATING LOGIN

        const newToken = token({id:user.id, role:user.roleId});
        await Token.create({token:newToken,ownerId:user.id,status:"active"}
        ).then(data =>{
          
         
      
         
          res.status(200).json({message:"A token for your session has been saved!",user:user.dataValues,token:data.token});
        })

        
      } else {
          res.status(200).json({
              message: "Incorrect email or password"
          })
      }

  //   }catch (err) {
  //     res.status(500).json(err);
  //   }

}

async logout(req, res) {
    
  const token = req?.headers?.authorization || req?.headers['x-access-token'] || req?.params.token
  
  const splitedToken = token.split(' ')[1];
  const tokenExist = await Token.findOne({where: {token:splitedToken}})
  if (tokenExist){
    const status = tokenExist.status
    console.log(status)
    if(status==='active'){
      await Token.update({status: 'expired'},{ where: {token:splitedToken}})
      res.status(200).json({message: 'Logged out successfully!'})
    }else{
      res.status(404).json({message: "There is no runing session for this user!"})
    }
  }else{
    res.status(404).json({message: "There is no token for this user!"})

  }  
}

async updateProfile(req, res) {
    
  const token = req?.headers?.authorization || req?.headers['x-access-token'] || req?.params.token
  
  const splitedToken = token.split(' ')[1];
  const tokenExist = await Token.findOne({where: {token:splitedToken}})
  if (tokenExist){
    const userId = tokenExist.ownerId
    
    if(userId){
      const updates = req.body
      await Profile.update({updates},{ where: {ownerId:userId}})
      res.status(200).json({message: 'Profile updated successfully!'})
    }else{
      res.status(404).json({message: "There is no runing session for this user!"})
    }
  }else{
    res.status(404).json({message: "There is no token for this user!"})

  }  
}





}
const authController = new AuthController()
export {authController as default}



//KICKING A USER OUT OF THE SYSTEM.
// export function logout(req, res){
//   res.cookie('jsonwebtoken', '', { maxAge: 1 });
//   res.json({user : 'user signed out'});
// }
