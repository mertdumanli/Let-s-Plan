const mongoose = require("mongoose");

const ModelSchemaRegister = new mongoose.Schema({
  uname: String,
  pass: String,
});

const ModelSchemaStreaming = new mongoose.Schema({
  uname: String, //username
  pass: String, //password
  text0: String, //Designer Name
  text1: String, //Plan Name
  texts: Array, //List of Lessons
  picture: String, //Photo url
  pictureBoolean: Boolean, //Photo t/f
  hoursBegin : Array,
  minutesBegin: Array,
  pieceTimes: Array,
  currentDate: String,
  options: Array,
});

const ModelSchemaLesson = new mongoose.Schema({
  uname: String,
  pass: String,
  text0: String, //Designer Name
  text1: String, //Plan Name
  texts: Array, //List of Lessons
  picture: String, //Photo url
  pictureBoolean: Boolean, //Photo t/f
  maxDay: { type: Number }, //Max day number
  maxLesson: { type: Number }, //Max lesson number
});

mongoose.model("modelRegister", ModelSchemaRegister);
mongoose.model("modelStreaming", ModelSchemaStreaming);
mongoose.model("modelLesson", ModelSchemaLesson);
