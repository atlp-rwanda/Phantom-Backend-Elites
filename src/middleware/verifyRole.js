import { Role } from '../../sequelize/models';

const verifyRole = async (req, res, next) => {
    const role = await Role.findOne({ where: { id: req.body.assignedId } });
    console.log(role);
    console.log(role);

    if (!role) return res.status(400).json({ message: "Assigned Role doesn't exist" });
    const driverPermissions = ['start', 'stop', 'change', 'edit', 'view'];
    const adminPermissions = ['create', 'update', 'delete', 'view', 'edit'];
    const operatorPermission = ['create', 'update', 'delete', 'view', 'register', 'remove'];

    switch (role.dataValues.name) {
        case "driver":
            if (!driverPermissions.includes(...req.body.name)) return res.status(400).json({ message: "Driver is not allowed to have that permission" });
            break;
        case "operator":
            if (!operatorPermission.includes(...req.body.name)) return res.status(400).json({ message: "Operator is not allowed to have that permission" });
            break;
        case "admin":
            if (!adminPermissions.includes(...req.body.name)) return res.status(400).json({ message: "Administrator is not allowed to have that permission" });
            break;
        default:
            return res.status(400).json({ message: "Unknown user" });
    }
    next();
};

export default verifyRole;