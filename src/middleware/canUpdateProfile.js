import Models from '../../sequelize/models';
import verifyToken from '../helpers/verifyToken';
import { development } from "../../sequelize/config/config.js";
import { Sequelize } from "sequelize";
import Tokens from '../../sequelize/models/Token'
import Roles from '../../sequelize/models/role'
let sequelize = new Sequelize(development);
let Token = Tokens(sequelize, Sequelize)
let Role = Roles(sequelize, Sequelize)



const canUpdateProfile = async (req, res, next) => {

  if (!req?.headers?.authorization
    && !req?.headers['x-access-token']
    && !req?.params.token){
     
      return res.status(401).json({message:"You should be authenticated to access this!"})
  
  }

  const token = req?.headers?.authorization || req?.headers['x-access-token'] || req?.params.token
  const id = req.params.id
  const splitedToken = token.split(' ')[1];
  const tokenExist = await Token.findOne({where: {token:splitedToken, ownerId:id, status:"active" }})
if(tokenExist){
  
  let userRoleId = verifyToken(splitedToken).role
  let roleObject = await Role.findOne({where: {id:userRoleId}})
  let roleName = roleObject.name


    
    if (!token) {
      return res.status(404).json({ message: 'You are not authorized this!'
      });
    }

 
  
    if (roleName !== 'driver' && roleName !== 'operator' ) {
      return res
        .status(403)
        .json({message: 'Only operators and drivers are allowed to update their profiles. Please sign in as an driver or operator!'})
    }
    next();
  

  }else{
    return res.status(404).json({message: 'You must be logged in to do this!'})
  }
}
 

export default canUpdateProfile;