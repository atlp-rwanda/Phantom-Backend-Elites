import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = process.env.PORT | 3000;

app.get("/", (req, res, next) => {
  res.send("<h1>Welcome to phantom app</h1>");
});

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
