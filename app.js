const express = require("express");
const app = express();
const cors = require("cors");

const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(cors());

const UserController = require("./Controllers/Auth/UserController");
const SigninController = require("./Controllers/Auth/SigninController");
const QuestionController = require("./Controllers/QuestionController");
const AnswerController = require("./Controllers/AnswerController");
app.use("/", UserController);
app.use("/", SigninController);
app.use("/", QuestionController);
app.use("/", AnswerController);

module.exports = app;
