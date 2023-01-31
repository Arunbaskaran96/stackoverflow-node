const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
  questionid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question",
    required: true,
  },
  answeredby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Answer", answerSchema);
