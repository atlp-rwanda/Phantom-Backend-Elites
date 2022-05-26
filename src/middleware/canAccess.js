import { sendErrorResponse } from '../utils/sendResponse.js';
import model from '../../sequelize/models';

const { Role, Permission, User } = model;

const canAccess= async (req, res, next) => {
    const {id, role, requiredPermissions} = req.headers

    const permissions = 
    [
    'change bus speed', 
    'edit profile',
    'create',
    'delete',
    'view',
    'edit', 
    'update'
]


    const user = await User.findOne({id, role})
    if(user){
        const permission = await Permission.findOne({where: {assignedId: role}})
        const name = permission.name

        if(name.length > 0){
            for(let i=0; i< name.length; i++){
                if(!permissions.includes(name[i]))
                return res.json({message: `You are not allowed to ${name[i]}` })
                else if(requiredPermissions.includes(name[i])){

                    next()
                }
                else
                    return res.status(404).json({message: `The minimum permissions (${[...requiredPermissions]}) not found`})  
            }
        }
        else return res.json({message: 'You are not yet assigned to permissions'})
    }
};

export default canAccess
