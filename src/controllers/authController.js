import token from '../../src/helpers/generateToken';
import verify from '../../src/helpers/verifyToken'
import Users from '../../sequelize/models/user'
import Tokens from '../../sequelize/models/Token'
import { development } from "../../sequelize/config/config.js";
import { Sequelize } from "sequelize";
import bcrypt from 'bcrypt'
let sequelize = new Sequelize(development);
let User = Users(sequelize, Sequelize);
let Token = Tokens(sequelize, Sequelize)
//User login
class AuthController {
  async login(req, res) {

    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).json({ message: "Incorrect email or password" });

    const isPasswordMatch = await bcrypt.compare(req.body.password,user.password);

    if (isPasswordMatch) {

      const newToken = token({ id: user.id, role: user.roleId });
      await Token.create({ token: newToken, ownerId: user.id, status: "active" }
      ).then(data => {
        res.status(200).json({ message: "A token for your session has been saved!", user: user.dataValues, token: data.token });
      })
    } else {
      res.status(400).json({
        message: "Incorrect email or password"
      })
    }
  }
}
const authController = new AuthController()
export { authController as default }



//KICKING A USER OUT OF THE SYSTEM.
// export function logout(req, res){
//   res.cookie('jsonwebtoken', '', { maxAge: 1 });
//   res.json({user : 'user signed out'});
// }
