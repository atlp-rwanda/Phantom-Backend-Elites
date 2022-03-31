import Joi from 'joi'

import {User, Role, Bus} from '../../sequelize/models'


class Validate{    
    
    async createBus(req, res, next){
        const schema = Joi.object({
            brand: Joi.string().required(),
            plateNo: Joi.string().regex(/^RA[A-Z][0-9]{3}[A-Z]/).required(),
            driver: Joi.number(),
            seats: Joi.number().required().min(3),
            status: Joi.string().required()
        })
        const {error, value} = schema.validate(req.body,{ abortEarly: false })
        if(error){
            const { details } = error;
            const errors = {};
            for (let item of details) errors[item.path[0]] = item.message;
            if(errors.hasOwnProperty("plateNo")) errors["plateNo"]= "PlateNo is required with format like this RAA111B";
            return res.status(400).json(errors)
        }
        const bus = await Bus.findOne({ where: { plateNo: req.body.plateNo } });
        if (bus) return res.status(409).json({ message: "Bus already exists" });

        if(req.body.driver){
            const user = await User.findOne({ where: { id: req.body.driver} });
            if (!user) return res.status(409).json({ message: "Assigned Driver doesn't exist" });  
            const role = await Role.findOne({ where: { id: user.roleId } });
            if (!role) return res.status(400).json({ message: "Unknown Driver" });
            if (role.name != 'driver') return res.status(400).json({ message: "Assigned Used is not a driver" });
        }
        
        

        
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
            
            if(req.body.driver){
                const user = await User.findOne({ where: { id: req.body.driver} });
                if (!user) return res.status(409).json({ message: "Assigned Driver doesn't exist" });
                   const role = await Role.findOne({ where: { id: req.body.driver } });
                if (!role) return res.status(400).json({ message: "Unknown Driver" });
                if (role.name != 'driver') return res.status(400).json({ message: "Assigned Used is not a driver" });
            }
            
            next() 
        } catch (error) {
            return res.status(400).json({ message: "Bus you want to update doesn't exist" });
        }
        
    }
}

export default new Validate()