import Models from '../../sequelize/models';
import verifyToken from '../helpers/verifyToken';

const { User,Token } = Models;

const isOperator = async (req, res, next) => {
  const { id } = req.user;
  const userToken = await Token.findOne({ where: { ownerId:id, status:"active" } });
  if (!userToken) {
    return res.status(403).json({
      status: 403,
      message: res.json('The token is not exist!'),
    });
  }
const userRole = verifyToken(userToken.token).role

  if (userRole !== 'operator' || userRole !== 'admin') {
    return res
      .status(403)
      .json({ status: 403, message: res.json('Please sign in as an operator!') });
  }
  next();
};

export default isOperator;