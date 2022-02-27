/* eslint-env browser */
import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";
import dotenv from "dotenv";
import i18next from "./config/i18nConf";
import middleware from "i18next-express-middleware";
import homeRoutes from "./routes/homeRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import permissionRoutes from "./routes/permissionRoutes.js";
import assignRoutes from "./routes/assignPermissionRoutes.js";

dotenv.config();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

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
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/permissions', permissionRoutes);
app.use('/api/v1/assigning', assignRoutes);
app.listen(PORT, () => {
console.log(`App listening on ${PORT}`);
});

export { app as default };
