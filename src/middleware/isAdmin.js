import verifyToken from '../helpers/verifyToken';
import Models from '../../sequelize/models';
const { ResetToken,Token } = Models;

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
      next();

    }else{
      res.status(404).json({message: "You should be authenticated to access this!"})
    }
  }else{
    res.status(404).json({message: "There is no token for this user!"})
  }
};
export default isAdmin;