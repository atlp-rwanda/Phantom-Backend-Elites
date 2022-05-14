import { Op } from 'sequelize';
import { paginate } from 'paginate-info';
import sendAssignEmail from "../services/sendAssignEmail.js";
import sendUnassignEmail from '../services/sendUnassignEmail.js';
import Models from '../../sequelize/models'

const { User, Bus, Notification } = Models;


const notification = async (user, content) => {
    await Notification.create({
      is_read: false,
      content,
      receiverId: user.id,
    });
  };


export const assignDriverToBus = async (req, res) => {
    try {
      const { driverId, plateNo } = req.body;
      const driver = await User.findOne({ where: { id: driverId } });
      if (!driver) return res.status(404).json({error: 'This Driver does not exist.'})
    
      if (driver.roleId !== 3) {
        return res.status(400).json({error: 'This user is not a driver.'})
      }
      
      const searchBus = await Bus.findOne({ where: { plateNo: plateNo } });
      if (!searchBus) res.status(404).json({error: 'This Bus does not exist.'})

      if (searchBus.driverId !== null) {
        return res.status(400).json({error: 'The bus is already assigned to a driver.'})
      }
     
      await Bus.update({ driverId: driverId }, { where: { plateNo: plateNo } });
  
      await notification(
        driver,
        `You have been successfully assigned to a bus: Plate no:${searchBus.plateNo} Brand: ${searchBus.brand}`,
      );
      const notifyMessage=`You have been successfully assigned to a bus: Plate no:${searchBus.plateNo} Brand: ${searchBus.brand}`
  
      sendAssignEmail(notifyMessage, driver.email);
      const result = await Bus.findOne({
        where: { driverId: driverId },
        include: ['drivers'],
      });
     res.status(200).json({message: 'Assigned Driver to bus successfully.',result})
       
    } catch (error) {
      return res.status(500).json({error: 'Error assigning driver to bus'});
    }
  };

  export const unAssignDriverFromBus = async (req, res) => {
    try {
      const {driverId} = req.params;
      const bus = await Bus.findOne({ where: { driverId: driverId } });
      if (!bus) return res.status(404).json({error: 'This driver is not assigned to a bus.'})
      await Bus.update({ driverId: null }, { where: { plateNo: bus.plateNo } });
  
      await notification(
        {id:driverId},
        'You are Unassigned from the bus you were driving'
      );
  
      const result = await User.findOne({
        where: { id: driverId },
        include: ['notifications'],
      });
      const driver = await User.findOne({ where: { id: driverId } });
      sendUnassignEmail('You are Unassigned from the bus you were driving', driver.email);
      res.status(200).json({message: 'UnAssigned Driver to bus successfully',result})
      
    } catch (error) {
       return res.status(500).json({error: 'Error occured while unassigning driver from bus'});
    }
  };


export const allDriverToBusAssignments = async (req, res) => {
    try {
      const { page = 1, limit = 8 } = req.query;
      const offset = (page - 1) * limit;
      const { rows, count } = await Bus.findAndCountAll({
        page,
        limit,
        where: { driverId: { [Op.ne]: null } },
        include: ['drivers'],
        order: [['updatedAt', 'DESC']],
      });
      const pagination = paginate(page, count, rows, limit);
  
      if (offset >= count) {
        return res.status(404).json({error: "There are no drivers assigned to buses yet"});
      }
      return res.status(200).json({message:'Successfully got a list of drivers assigned to buses.', pagination, rows})
    }catch (error) {
      return res.status(500).json({error:'Error while getting occupied drivers'});
    }
  };