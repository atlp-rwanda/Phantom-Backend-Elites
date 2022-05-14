import {Bus, User} from '../../sequelize/models'

class BusController {
    async createBus(req, res) {
        try {
            const bus = await Bus.create({
                brand: req.body.brand,
                plateNo: req.body.plateNo,
                driverId: req.body.driverId || null,
                seats: req.body.seats,
                status: req.body.status
            })
            res.status(201).json({
                message: 'Bus create sucessfully',
                bus
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: 'Unable to create bus'
            })
        }

    }
    async updateBus(req, res) {
        try {
            const result = await Bus.update(req.body, {
                where: { plateNo: req.params.plateNo }
            })
            if(result){
                const bus = await Bus.findByPk(req.params.plateNo)
                return res.status(201).json({"message":"Updated Sucessfully",bus})
            }
        } catch (error) {
            res.status(400).json({
                message: 'Unable to update bus'
            })
        }
    }
    async deleteteBus(req, res) {
        try {
            await Bus.destroy({
                where: { plateNo: req.params.plateNo }
            })
            res.status(200).json({
                message: 'Bus deleted sucessfully',
            })
        } catch (error) {
            res.status(400).json({
                message: `Unable to delete bus with plate ${req.body.plateNo}`
            })
        }
    }
    async getOneBus(req, res) {
        try {
            const bus = await Bus.findByPk(req.params.plateNo)


            res.status(200).json({
                message: 'Bus found',
                bus
            })
        } catch (error) {
            res.status(400).json({
                message: `Unable to find bus with plate ${req.body.plateNo}`
            })
        }
    }
    async getAllBuses(req, res) {
        try {
            const bus = await Bus
            .findAll({
              include: {
                model: User,
                as: "drivers",
                attributes: ['id','firstName', 'lastName', 'email']
              }
            })
            res.status(201).json(bus)
        } catch (error) {
            console.log('-------------------',error)
            res.status(400).json({
                message: `Unable to find buses`
            })
        }
    }
    async getPaginatedList(req, res) {
        try {
            let limit = 4;
            let offset = 0;
            let page = req.params.page;
            if (page == undefined || isNaN(page || page == '')) {
                return res.status(400).json({
                    message: `Check if not page is number type or is not missing`
                })
            }
            const bus = await Bus.findAndCountAll()
                .then((data) => {
                    let pages = Math.ceil(data.count / limit);
                    offset = limit * (page - 1);
                    Bus.findAll({
                        limit: limit,
                        offset: offset
                    })
                        .then((bus) => {
                            return res.status(200).json({
                                message: 'Buses found',
                                result: bus,
                                count: data.count,
                                pages: pages
                            });
                        });
                })
        } catch (error) {
            res.status(400).json({
                message: `Unable to find buses`
            })
        }
    }
}
export default BusController
