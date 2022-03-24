import { Op } from 'sequelize';
import { paginate } from 'paginate-info';
import sendEmail from "../services/sendEmail.js";

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
      const { driverId, busId } = req.body;
      const driver = await User.findOne({ where: { id: driverId } });
      if (!driver) return res.status(404).json({message: 'This Driver does not exist.'})
    
      if (driver.roleId !== 3) {
        return res.status(400).json({message: 'This user is not a driver.'})
      }

      if (driver.busId !== null) {
        return res.status(400).json({message: 'The driver is already assigned to a bus.'})
      }

      const searchBus = await Bus.findOne({ where: { id: busId } });
      if (!searchBus) res.status(404).json({message: 'This Bus does not exist.'})
     
      await User.update({ busId: driver.busId }, { where: { id: driverId } });
  
      await notification(
        driver,
        `You have been successfully assigned to a bus: Plate no:${searchBus.plate} Brand: ${searchBus.brand}`,
      );
      const notifyMessage=`You have been successfully assigned to a bus: Plate no:${searchBus.plate} Brand: ${searchBus.brand}`
  
      const result = await User.findOne({
        where: { id: driverId },
        include: ['bus', 'notifications'],
      });
     sendEmail(notifyMessage, driver.email);
     res.status(200).json({message: 'Assigned Driver to bus successfully.',result})
       
    } catch (error) {
      return res.status(500).json({message: 'Error assigning driver to bus'});
    }
  };

  export const unAssignDriverFromBus = async (req, res) => {
    try {
      const { driverId } = req.params;
      const driver = await User.findOne({ where: { id: driverId } });
      if (!driver) return res.status(404).json({message: 'This Driver does not exist.'})
      if (driver.busId === null) {
        return res.status(400).json({message: 'The driver is not yet assigned to any bus.'})
      }
      await User.update({ busId: null }, { where: { id: driverId } });
  
      await notification(
        driver,
        'You are Unassigned from the bus you were driving',
      );
  
      const result = await User.findOne({
        where: { id: driverId },
        include: ['notifications'],
      });
      sendEmail('You are Unassigned from the bus you were driving', driver.email);
      res.status(200).json({message: 'UnAssigned Driver to bus successfully',result})
      
    } catch (error) {
       return res.status(500).json({message: 'Error occured while unassigning driver from bus'});
    }
  };


export const allDriverToBusAssignments = async (req, res) => {
    try {
      const { page = 1, limit = 8 } = req.query;
      const offset = (page - 1) * limit;
      const { rows, count } = await User.findAndCountAll({
        page,
        limit,
        where: { busId: { [Op.ne]: null } },
        include: ['bus'],
        order: [['updatedAt', 'DESC']],
      });
      const pagination = paginate(page, count, rows, limit);
  
      if (offset >= count) {
        return res.status(404).json({message: "We can't get that page"});
      }
  
      return res.status(200).json({message:'Successfully got a list of drivers assigned to buses.'},{ pagination, rows})
    }catch (error) {
      return res.status(500).json({message:'Error while getting occupied drivers'});
    }
  };