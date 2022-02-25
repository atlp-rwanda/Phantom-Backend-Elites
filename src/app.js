// import app from "express";
const express = require(`express`);
// import i18next from "./config/i18nConf";
// import middleware from "i18next-express-middleware";
// import userRoute from "../routes/user";
const db = require("./db");


var app = express()
const port = process.env.PORT || 3000;

app.use(middleware.handle(i18next,{
    ignoreRoutes: ["/foo"], //ignore route from being internationalize ex:/foo
    removeLngFromUrl: false
  }))

  db.authenticate()
    .then(() => console.log(`Database Connected`))
    .catch((err) => console.error(err));

app.get('/home',(req, res, next)=>{
    res.send({message: req.t('hello_world')})
})
app.use(`/users`, userRoute);

app.listen(port, ()=>{
    console.log(`Connected : ${port} port`)
})

