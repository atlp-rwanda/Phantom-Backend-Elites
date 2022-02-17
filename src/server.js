import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  res.send("<h1>Welcome to phantom app</h1>");
});
