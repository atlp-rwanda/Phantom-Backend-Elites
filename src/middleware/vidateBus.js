import Joi from 'joi'

import Users from '../../sequelize/models/User'
import { development } from "../../sequelize/config/config.js";
import { Sequelize } from "sequelize";
import Roles from '../../sequelize/models/role'
import Buses from '../../sequelize/models/bus'

let sequelize = new Sequelize(development);
let User = Users(sequelize, Sequelize);
let Role = Roles(sequelize, Sequelize)
let Bus  = Buses(sequelize, Sequelize)

class Validate{
    
    
    
    async createBus(req, res, next){
        const schema = Joi.object({
            brand: Joi.string().required(),
            plateNo: Joi.string().required(),
            driver: Joi.number(),
            seats: Joi.number().required(),
            status: Joi.string().required()
        })
        const {error, value} = schema.validate(req.body,{ abortEarly: false })
        if(error){
            const { details } = error;
            const errors = {};
            for (let item of details) errors[item.path[0]] = item.message;
            return res.status(400).json(errors)
        }
        const user = await User.findOne({ where: { id: req.body.driver} });
        if (!user) return res.status(409).json({ message: "Assigned Driver doesn't exist" });
        
        const bus = await Bus.findOne({ where: { plateNo: req.body.plateNo } });
        if (bus) return res.status(409).json({ message: "Bus already exists" });

        const role = await Role.findOne({ where: { id: user.roleId } });
        if (!role) return res.status(400).json({ message: "Assigned User is not a driver" });
        
        next()
    }
    async updateRole(req, res, next){
        const schema = Joi.object({
            brand: Joi.string(),
            plateNo: Joi.string().required(),
            driver: Joi.number(),
            seats: Joi.number(),
            status: Joi.string()
        })
        const {error, value} = schema.validate({plateNo:req.params.plateNo,...req.body},{ abortEarly: false })
        if(error){
            const { details } = error;
            const errors = {};
            for (let item of details) errors[item.path[0]] = item.message;
            return res.status(400).send(errors)
        }
        try {
            const bus = await Bus.findOne({ where: { plateNo:req.params.plateNo } });
            if (!bus) return res.status(400).json({ message: "Bus you want to update doesn't exist" });
            
            next() 
        } catch (error) {
            return res.status(400).json({ message: "Bus you want to update doesn't exist" });
        }
        
    }
}

export default new Validate()