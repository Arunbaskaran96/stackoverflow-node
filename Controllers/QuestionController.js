const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const questions = require("../models/QuestionModel");
const authverify = require("../Controllers/Middleware/Verify");
const userverify = require("../Controllers/Middleware/Userid");

router.post("/question", authverify, userverify, (req, res) => {
  const id = req.userUniqueId ? req.userUniqueId : null;

  const addQuestion = new questions({
    askedby: id,
    question: {
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags,
    },
  });

  addQuestion
    .save()
    .then((result) => {
      res.status(200).json({ message: "added" });
    })
    .catch((err) => {
      res.status(500).json({ message: "somethingwent wrong" });
    });
});

router.get("/questions", authverify, (req, res) => {
  questions
    .find()
    .populate("askedby")
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(200).json({ message: "no questions" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    });
});

router.get("/question/:id", authverify, (req, res) => {
  questions
    .find({ _id: req.params.id })
    .populate("askedby")
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(200).json({ message: "no question found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    });
});

module.exports = router;
