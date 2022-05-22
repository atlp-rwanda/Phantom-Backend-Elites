import Joi from 'joi';

const validateBusStation = (busStation) => {
    const schema = Joi.object({
        busStationName: Joi.string().required(),
        coordinates: Joi.string().min(36).max(43).required()
    });

    return schema.validate(busStation);
};

export default validateBusStation;