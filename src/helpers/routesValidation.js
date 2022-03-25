import Joi from 'joi';

const validateRoute = (route) => {
    const schema = Joi.object({
        // name: Joi.string().min(3).max(30).required(),
        busStations: [
            Joi.array().items().min(2)
        ],
        // assignedBuses: [
        //     Joi.array()
        // ]
    });

    return schema.validate(route);
};

export default validateRoute;