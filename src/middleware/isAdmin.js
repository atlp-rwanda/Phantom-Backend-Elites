import Models from '../../sequelize/models';
import verifyToken from '../helpers/verifyToken';
import ResetTokens from '../../sequelize/models/ResetToken'
import { development } from "../../sequelize/config/config.js";
import { Sequelize } from "sequelize";
import Tokens from '../../sequelize/models/Token'
let sequelize = new Sequelize(development);


let Token = Tokens(sequelize, Sequelize)




const isAdmin = async (req, res, next) => {

if (!req?.headers?.authorization
  && !req?.headers['x-access-token']
  && !req?.params.token){
   
    return res.status(401).json({message:"You should be authenticated to access this!"})

}
  const token = req?.headers?.authorization || req?.headers['x-access-token'] || req?.params.token
  
  const splitedToken = token.split(' ')[1];
  const tokenExist = await Token.findOne({where: {token:splitedToken}})
  if (tokenExist){
    const status = tokenExist.status
    if(status==='active'){
      const userRoleId = verifyToken(splitedToken).role


      if (userRoleId !== 1) {
    
        return res
          .status(403)
          .json({ message: 'Please sign in as an admin!'});
      }

      const message=`Hello there
      
      
      Reached here!`
      console.log(message)
      next();

    }else{
      res.status(404).json({message: "You should be authenticated to access this!"})
    }
  }else{
    res.status(404).json({message: "There is no token for this user!"})
  }
};
export default isAdmin;