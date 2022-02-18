import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
import homeRoutes from "./routes/homeRoutes.js";

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
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJSDoc(options);
const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.get("/junior", (req, res) => {
  res.send("Introduction to the ones and best.");
});

app.use(cors());
app.use(express.json());
app.use(homeRoutes);

// export default app;
export { app as default };
