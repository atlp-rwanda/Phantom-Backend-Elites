import Models from '../../sequelize/models';
const { Route, Bus } = Models;
const viewListOfBuses = async (req, res) => {
  try {
    const { origin, destination } = req.body;
    const route = await Route.findAll({ where: { origin, destination } });
    if (route.length === 0) {
      return res.status(404).json({message: "Route with that source and destination was not found."})
    }
    const { assignedBuses } = route[0].dataValues;
    const buses = assignedBuses.map(async (assignedBus) => {
      const oneBus = await Bus.findOne({ where: { id: assignedBus } });
      return oneBus.dataValues;
    });
    const response = await Promise.all(buses);
    return res.status(200)
    .json({message: "Buses found! Below is the list of available buses for this route.", counts: response.length, buses: response })   
  } catch (err) {
    return res.status(500).json({message: 'There was an error while getting the list of buses on this route'})
  }
};

export default viewListOfBuses