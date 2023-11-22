const express = require("express");
import express, { Application } from "express";
const port = 3000;
const app: Application = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
