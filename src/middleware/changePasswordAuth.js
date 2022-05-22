import Models from '../../sequelize/models';
import verifyToken from '../helpers/verifyToken';

const { Token } = Models;

const isOperator = async (req, res, next) => {
  const { id } = req.user;
  const userToken = await Token.findOne({ where: { ownerId:id, status:"active" } });
  if (!userToken) {
    return res.status(403).json({
      status: 403,
      message: res.json('Invalid Token'),
    });
  }
const userRole = verifyToken(userToken.token).role

  if (userRole !== 'operator' || userRole !== 'admin' || userRole !== 'driver') {
    return res
      .status(403)
      .json({ status: 403, message: res.json('Sorry, You have to be logged in your account') });
  }
  next();
};

export default isOperator;