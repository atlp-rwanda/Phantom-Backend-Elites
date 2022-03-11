import Buses from '../../sequelize/models/bus'
import { development } from "../../sequelize/config/config.js";
import { Sequelize } from "sequelize";
let sequelize = new Sequelize(development);
let Bus = Buses(sequelize, Sequelize);

class BusController {
     async createBus(req, res){
         try {
            const createdBus = await Bus.create({
                brand: req.body.brand,
                plateNo: req.body.plateNo,
                driver: req.body.driver,
                seats: req.body.seats,
                status: req.body.status
            })
            res.status(201).json({
                message: 'Bus create sucessfully',
                bus: createdBus
            })
         } catch (error) {
             console.log(error)
            res.status(400).json({
                message: 'Unable to create bus'
            })
         }
       
     }
     async updateBus(req, res){
        try {
           const createdBus = await Bus.update(req.body,{
            where: { plateNo: req.params.plateNo }
            })
           res.status(201).json({
               message: 'Bus updated sucessfully',
               createdBus
           })
        } catch (error) {
           res.status(400).json({
               message: 'Unable to update bus'
           })
        }
    }
    async deleteteBus(req, res){
        try {
           await Bus.destroy({
            where: { plateNo: req.params.plateNo }
          })
           res.status(201).json({
               message: 'Bus deleted sucessfully',
           })
        } catch (error) {
           res.status(400).json({
               message: `Unable to delete bus with plate ${req.body.plateNo}`
           })
        }
    }
    async getOneBus(req, res){
        try {
           const bus = await Bus.findByPk(req.params.plateNo)
        
           res.status(201).json({
               message: 'Bus found',
               bus
           })
        } catch (error) {
           res.status(400).json({
               message: `Unable to find bus with plate ${req.body.plateNo}`
           })
        }
    }
    async getAllBuses(req, res){
        try {
           const bus = await Bus.findAll()
        
           res.status(201).json({
               message: 'Buses found',
               bus
           })
        } catch (error) {
           res.status(400).json({
               message: `Unable to find buses`
           })
        }
    }
}
  export default BusController
  