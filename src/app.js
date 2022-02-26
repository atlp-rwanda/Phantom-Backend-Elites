import express from 'express'
import User from './models/user'
import sequelize from 'sequelize'
import i18next from './config/i18nConf';
import userRoute from './routers/userRoute'
import middleware from "i18next-express-middleware";
import auth from './routes/auth';
const app = express()



const port = process.env.PORT || 3000

app.use(middleware.handle(i18next,{
    ignoreRoutes: ["/foo"], //ignore route from being internationalize ex:/foo
    removeLngFromUrl: false
  }))


app.use(express.json())                                                                                                                                                                                                                                        
app.use('/api/v1/',userRoute)
app.use('/', auth);


app.listen(port,()=>console.log(`Application is running on ${port}`))
