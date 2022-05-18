import Joi from 'joi';

const validateRoute = (route) => {
    const schema = Joi.object({
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