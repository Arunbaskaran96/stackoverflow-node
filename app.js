const express = require("express");
const app = express();
const cors = require("cors");

const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(cors());

const UserController = require("./Controllers/Auth/UserController");
app.use("/", UserController);

module.exports = app;
