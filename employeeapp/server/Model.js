const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema({
  text0: String,
  text1: String,
  options: Array,
  sectionsMinutesBegin: Array,
  sectionsHoursBegin: Array,
  sectionsMinutesEnd: Array,
  sectionsHoursEnd: Array
});

mongoose.model("model", ModelSchema);
