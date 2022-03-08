import Joi from 'joi'
import Users from '../../sequelize/models/user'
import { development } from "../../sequelize/config/config.js";
import { Sequelize } from "sequelize";
import Roles from '../../sequelize/models/role'
let sequelize = new Sequelize(development);
let User = Users(sequelize, Sequelize);
let Role = Roles(sequelize, Sequelize)

class Validate{
    loginFields(req, res, next){
        const schema = Joi.object({
            email: Joi.string().required()
            .email({ minDomainSegments: 2}),
            password: Joi.string().required()
        })
        const {error, value} = schema.validate(req.body,{ abortEarly: false })
        if(error){
            const { details } = error;
            const errors = {};
            for (let item of details) errors[item.path[0]] = item.message;
            return res.status(400).send(errors)
        }
        next()        
    }
    
    
    async userFields(req, res, next){
        
        const schema = Joi.object({
            email: Joi.string().required()
            .email({ minDomainSegments: 2}),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            roleId: Joi.number().min(2).required().messages({
                "number.min": "Choose another role"
            }),
            dateofbirth: Joi.string().required(),
            gender: Joi.string().required(),
            address: Joi.string().required()
        })
        const {error, value} = schema.validate(req.body,{ abortEarly: false })
        if(error){
            const { details } = error;
            const errors = {};
            for (let item of details) errors[item.path[0]] = item.message;
            return res.status(400).send(errors)
        }
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user) return res.status(400).json({ message: "User email already exist" });
        const role = await Role.findOne({ where: { id: req.body.roleId } });
        if (!role) return res.status(400).json({ message: "Role doesn't exist" });
        next()
        
    }
    async createRole(req, res, next){
        const schema = Joi.object({
            id: Joi.number(),
            name: Joi.string().required()
        })
        const {error, value} = schema.validate(req.body,{ abortEarly: false })
        if(error){
            const { details } = error;
            const errors = {};
            for (let item of details) errors[item.path[0]] = item.message;
            return res.status(400).send(errors)
        }
        const role = await Role.findOne({ where: { name: req.body.name.toLowerCase() } });
        if (role) return res.status(400).json({ message: "Role already exist" });
        const roles = ['driver','dperator','admin']
        if(!roles.includes(req.body.name)){
            return res.status(400).json({ message: "Unknow role can't be created" });
        }
        next()
    }
    async updateRole(req, res, next){
        const schema = Joi.object({
            name: Joi.string().required()
        })
        const {error, value} = schema.validate(req.body,{ abortEarly: false })
        if(error){
            const { details } = error;
            const errors = {};
            for (let item of details) errors[item.path[0]] = item.message;
            return res.status(400).send(errors)
        }
        try {
            const role = await Role.findOne({ where: { id: req.params.id } });
            if (!role) return res.status(400).json({ message: "Role you want to update doesn't exist" });
            
            next() 
        } catch (error) {
            return res.status(400).json({ message: "Role you want to update doesn't exist" });
        }
        
    }

}

export default new Validate()