
import userRoute from './userRoute';
import roleRoute from './roleRoutes';
import homeRoute from './homeRoutes';
const route = express.Router();

route.use('/api/v1/auth', userRoute);


route.use('/api/v1/roles', roleRoute);


export default route;