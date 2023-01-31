const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const users = require("../../models/Usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "Arun";

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    const user = new users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      _id: new mongoose.Types.ObjectId(),
      city: req.body.city,
      about: req.body.about,
    });

    await user.save();
    res.status(200).json({ message: "user created" });
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
    console.log(error);
  }
});

router.get("/user/:id", (req, res) => {
  users
    .findOne({ _id: req.params.id })
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.json({ message: "no found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "something went wrong" });
    });
});

router.get("/user", (req, res) => {
  const email = req.Token.email;
  users.findOne({ email: email }).then((result) => {
    if (result) {
      res.json(result);
    }
  });
});

router.get("/users", (req, res) => {
  users
    .find()
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(200).json({ message: "no users" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "something went wrong" });
      console.log(error);
    });
});

module.exports = router;
