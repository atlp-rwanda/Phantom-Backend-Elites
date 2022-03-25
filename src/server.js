// eslint-disable-next-line no-undef
/* eslint-env browser */
import busStationRoute from "./routes/busStationsRoute";
import routesRoute from "./routes/routesRoute";
import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";
import dotenv from "dotenv";
import i18next from "./config/i18nConf";
import middleware from "i18next-express-middleware";
import homeRoutes from "./routes/homeRoutes.js";
import db from '../sequelize/models/index';

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Phantom-app",
      version: "1.0.0",
      description:
        "Phantom-app for user which will help to reduce route congestion.",
    },
    servers: [
      {
        url: `http://localhost:3000`,
      },
      {
        url: `https://phantom-pipe-add-expres-fk8xcu.herokuapp.com`,
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJSDoc(options);
const app = express();

app.use(
  middleware.handle(i18next, {
    ignoreRoutes: ["/foo"], //ignore route from being internationalize ex:/foo
    removeLngFromUrl: false,
  })
);

app.get("/home", (req, res, next) => {
  res.send({ message: req.t("hello_world") });
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.get("/junior", (req, res) => {
  res.send("Introduction to the ones and best.");
});

app.use(cors());
app.use(express.json());
app.use(homeRoutes);
app.use('/api/v1/routes', routesRoute);
app.use('/api/v1/bus-stations', busStationRoute);

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ alter: false }).then(() => {
  console.log('Database Connected!');
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
});

export { app as default };
