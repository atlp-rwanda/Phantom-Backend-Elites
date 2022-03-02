import token from '../../src/helpers/generateToken';
import verify from '../../src/helpers/verifyToken'
import Users from '../../sequelize/models/User'
import { development } from "../../sequelize/config/config.js";
import { Sequelize } from "sequelize";
import bcrypt from 'bcrypt'
let sequelize = new Sequelize(development);
let User = Users(sequelize, Sequelize);
//User login
class AuthController{
    async login(req, res) {
    
  // try {
      const user = await User.findOne({ email: req.body.email });
      if(!user) return res.status(400).json({message: "Wrong email detected!"});
     
          
      
      if (user.password===req.body.password)
      {
        console.log(`Password from database  ${user.password}`)
        console.log(`Password from user  ${req.body.password}`)
                  // JSON WEB TOKEN FOR ATHENTICATING LOGIN
        const newToken = token({id:user.id, role:user.role});
        await User.update(newToken).then(data =>{
          res.status(200).send({message:"User updated with your token!"})
        })
        // console.log(newToken);
        // console.log(verify(newToken))

      
          const { password, ...others } = user
      
          res.status(200).json({...others});
          

      } else {
          res.status(200).json({
              message: "Incorrect email or password"
          })
      }

  //   }catch (err) {
  //     res.status(500).json(err);
  //   }

}
}
const authController = new AuthController()
export {authController as default}



//KICKING A USER OUT OF THE SYSTEM.
// export function logout(req, res){
//   res.cookie('jsonwebtoken', '', { maxAge: 1 });
//   res.json({user : 'user signed out'});
// }
