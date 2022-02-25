import app from "express";
import i18next from "./config/i18nConf";
import middleware from "i18next-express-middleware";
const passwordReset = require("../src/routes/passwordReset");
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

app.use("/api/password_reset", passwordReset);

app.get('/home',(req, res, next)=>{
    res.send({message: req.t('hello_world')})
})


app.listen(port, ()=>{
    console.log(`Connected : ${port} port`)
})

