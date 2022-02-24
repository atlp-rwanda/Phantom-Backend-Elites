import jwt from 'jsonwebtoken';
import User from '../models/user';
import 'dotenv/config'
const auth = async (req, res, next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        // const token = req.header('x-auth-token');
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        // const user = await User.findOne({_id:decoded._id});
        console.log(user)
        if(!user){
            throw new Error();
        }
        req.token = token
        req.user = user
        next();
    } catch (error) {
        res.status(401).send({message: 'Please authenticate...'})
        return;
    }
}

export {auth as default};