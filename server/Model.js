const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema({
  type: String,//1-Streaming, 2-Lessons
  text0: String,//Designer Name
  text1: String,//Plan Name
  options: Array,//List of Streaming
  texts: Array,//List of Lessons
  sectionsMinutesBegin: Array,//Başlangıç dakikası
  sectionsHoursBegin: Array,//Başlangıç saati
  sectionsMinutesEnd: Array,//Bitiş dakikası
  sectionsHoursEnd: Array//Bitiş saati
});

mongoose.model("model", ModelSchema);
