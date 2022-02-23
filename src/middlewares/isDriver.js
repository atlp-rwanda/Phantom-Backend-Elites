import Models from '../../sequelize/models';

const { Users } = Models;

const isDriver = async (req, res, next) => {
  const { email, role } = req.user;
  const user = await Users.findOne({ where: { email: req.user.email } });
  if (!user) {
    return res.status(403).json({
      status: 403,
      message: 'The user with that email does not exist!',
    });
  }
  if (role !== 'driver') {
    return res
      .status(403)
      .json({ status: 403, message: 'Please sign in as a driver!' });
  }
  next();
};

export default isDriver;