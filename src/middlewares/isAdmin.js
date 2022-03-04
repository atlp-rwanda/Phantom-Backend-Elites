import Models from '../../sequelize/models';
import verifyToken from '../helpers/verifyToken';

const { User,Token } = Models;

const isAdmin = async (req, res, next) => {
  
  
  // const userToken = await Token.findOne({ where: { ownerId:id, status:"active" } });
  // if (!userToken) {
  //   return res.status(403).json({
  //     status: 403,
  //     message: res.json('The token is not exist!'),
  //   });
  // }
  // const token = req.cookies.jsonwebtoken;
if (!req?.headers?.authorization
  && !req?.headers['x-access-token']
  && !req?.params.token){
    console.log(req?.headers?.authorization)
    return res.status(401).json({message:"You should be authenticated to access this!"})

}
  const token = req?.headers?.authorization || req?.headers['x-access-token'] || req?.params.token
  
  const splited = token.split(' ')[1];
  console.log(splited)

  const userRoleId = verifyToken(splited).role


  if (userRoleId !== 1) {

    return res
      .status(403)
      .json({ message: 'Please sign in as an admin!'});
  }

  console.log("Reached here!")
  next();
};

export default isAdmin;