import Models from '../../sequelize/models';

const { Users } = Models;

const isAdmin = async (req, res, next) => {
  const { email, role } = req.user;
  const user = await Users.findOne({ where: { email: req.user.email } });
  if (!user) {
    return res.status(403).json({
      status: 403,
      message: res.json('The user with that email does not exist!'),
    });
  }
  if (role !== 'admin') {
    return res
      .status(403)
      .json({ status: 403, message: res.json('Please sign in as an admin!') });
  }
  next();
};

export default isAdmin;