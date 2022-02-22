import express from 'express';
import i18next from './config/i18nConf';
import middleware from "i18next-express-middleware";

var app = express()
const port = process.env.PORT || 1110;

app.use(middleware.handle(i18next,{
    ignoreRoutes: ["/foo"], //ignore route from being internationalize ex:/foo
    removeLngFromUrl: false
  }))

app.get('/home',(req, res, next)=>{
    res.send({message: req.t('hello_world')})
})

app.listen(port, ()=>{
    console.log(`Connected : ${port} port`)
})

