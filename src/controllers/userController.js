import User from '../models/user'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import 'dotenv/config'

class UserController{
    async login(req, res){
        const project = await User.findOne({ where: { email: req.body.email } });
        // const isPasswordMatch = req.body.password === project.password ? true: false;
        const isPasswordMatch = await bcrypt.compare(req.body.password, project.password)
        if (project === null || !isPasswordMatch) {
           res.status(404).send({message: 'Incorrect email or password'});
        } else {
            const token = jwt.sign({_id: project.email},process.env.SECRET_KEY);
            res.statu(200).send({token: token,message:'Login successfully',project})
        }
    }
}
export { UserController as default}