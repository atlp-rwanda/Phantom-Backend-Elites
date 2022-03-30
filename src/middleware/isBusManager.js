
import verifyToken from '../helpers/verifyToken';
import {Token} from '../../sequelize/models'
import {User} from '../../sequelize/models'
import {Role} from '../../sequelize/models'



const isBusManager = async (req, res, next) => {
    try {
        if (!req?.headers?.authorization
            && !req?.headers['x-access-token']
            && !req?.params.token) {

            return res.status(401).json({ message: "You should be authenticated to access this!" })

        }
        const token = req?.headers?.authorization || req?.headers['x-access-token'] || req?.params.token

        const splitedToken = token.split(' ')[1];
        const tokenExist = await Token.findOne({ where: { token: splitedToken } })
        if (tokenExist) {
            const status = tokenExist.status
            if (status === 'active') {
                const userRoleId = verifyToken(splitedToken).role
                const user = await User.findOne({ where: { roleId: userRoleId } });
                if (!user) return res.status(400).json({ message: "Please sign in as an admin or operator!" });
                const role = await Role.findOne({ where: { id: userRoleId } });
                if (!role) return res.status(400).json({ message: "Please sign in as an admin or operator!" });

                const allowedUser = ['operator', 'admin']

                if (!allowedUser.includes(role.name)) {

                    return res
                        .status(403)
                        .json({ message: 'Please sign in as an admin!' });
                }
                next();

            } else {
                res.status(404).json({ message: "You should be authenticated to access this!" })
            }
        } else {
            res.status(404).json({ message: "There is no token for this user!" })
        }
    } catch (error) {
        res.status(404).json({ message: "There is no token for this user!" })
    }
};
export default isBusManager;