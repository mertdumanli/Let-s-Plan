const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema({
  type: String,//1-Streaming, 2-Lessons
  text0: String,//Designer Name
  text1: String,//Plan Name
  texts: Array,//List of Lessons
  sectionsMinutesBegin: Array,//Başlangıç dakikası
  sectionsHoursBegin: Array,//Başlangıç saati
  sectionsMinutesEnd: Array,//Bitiş dakikası
  sectionsHoursEnd: Array,//Bitiş saati
  picture: String,//Photo url
  pictureBoolean: Boolean,//Photo t/f
  maxDay: { type: Number},//Max day number
  maxLesson: { type: Number},//Max lesson number
});


const ModelSchemaLesson = new mongoose.Schema({
  username : String,
  password : String,
  text0: String,//Designer Name
  text1: String,//Plan Name
  texts: Array,//List of Lessons
  picture: String,//Photo url
  pictureBoolean: Boolean,//Photo t/f
  maxDay: { type: Number},//Max day number
  maxLesson: { type: Number},//Max lesson number
});

const ModelSchemaRegister = new mongoose.Schema({
  username : String,
  password : String
});


mongoose.model("model", ModelSchema);
mongoose.model("modelLesson", ModelSchemaLesson);
mongoose.model("modelRegister", ModelSchemaRegister);