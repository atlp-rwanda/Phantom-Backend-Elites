import express, { Router } from 'express'
import userRoute from './routers/userRoute'
import sequelize from 'sequelize'
import User from './models/user'
const app = express()
const port = process.env.PORT || 3000


app.use(express.json())                                                                                                                                                                                                                                        
app.use('/api/v1/',userRoute)

app.post('/insert', async (req, res, next)=>{
    const userDetails = await User.build({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
   });
   await userDetails.save()
   if(!userDetails){
      return res.status(200).send({
        status: 404,
        message: 'No data found'
   });
   }else{
        return res.status(200).send({
            status: 200,
            message: 'Data Saved Successfuly'
        });
   }
})

app.get('/create',(req,res)=>{
    User.sync({alter : true});
    res.send('user app recreated successfully')
})

app.get('/drop',(req,res)=>{
    User.drop();
    res.send('user table deleted')
})


app.listen(port,()=>console.log(`Application is running on ${port}`))
