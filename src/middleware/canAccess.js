import { sendErrorResponse } from '../utils/sendResponse.js';
import model from '../../sequelize/models';

const { Role, Permission, User } = model;

const canAccess= async (req, res, next) => {
    const {id, role, required_permissions} = req.headers
    let required_permissions_splitted = required_permissions.split(' ')

    const permissions = [
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

        const roleData = await Role.findOne({where: {id: role}})
        if(roleData.dataValues.name === 'admin') {

            next()
        }else{

            const permission = await Permission.findOne({where: {assignedId: role}})
            if(permission){
                const name = permission.dataValues.name
        
                if(name.length > 0){
                    const availableRequiredNames = []
                    const extra = [] 

                    for(let i=0; i< name.length; i++){
                        if(!permissions.includes(name[i])) {
                            extra.push(name[i])

                            if(i === name.length-1) return res.json({message: `You are not allowed to ${name[i]}`})

                        } 
                        else{
                            if(required_permissions_splitted.includes(name[i])) availableRequiredNames.push(name[i])
                            else extra.push(name[i])
                        }
                    }  
                    console.log(availableRequiredNames)      
                    console.log(required_permissions_splitted)      
                    let is_same = availableRequiredNames.length == required_permissions_splitted.length && availableRequiredNames.every(function(element, index) {
                        return element === required_permissions_splitted[index]; 
                    }); 
                    console.log(is_same)
                    if(is_same===true) next()

                    else return res.status(404).json({message: `The minimum permissions (${required_permissions_splitted}) not found`}) 
                                   
                }
                else return res.json({message: 'Nothing available in your permissions bag'})
                
            }
            else return res.json({message: 'Ask the incharges to assign you a permission!'})
            
        }
        }  
    }

export default canAccess
