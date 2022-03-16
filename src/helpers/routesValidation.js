import Joi from 'joi';

const validateRoute = (route) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        origin: Joi.string().min(3).max(30).required(),
        destination: Joi.string().min(3).max(30).required(),
        distance: Joi.string().min(3).max(30).required(),
        busStops: [
            Joi.array()
        ],
        assignedBuses: [
            Joi.array()
        ]
    });

    return schema.validate(route);
};

export default validateRoute;