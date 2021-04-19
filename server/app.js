const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./Model");


app.use(bodyParser.json());

const Model = mongoose.model("model");

const mongoUri =
  "put your url here"

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo yeahhh");
});
mongoose.connection.on("error", (err) => {
  console.log("error", err);  
});

app.get("/", (req, res) => {
  Model.find({}).then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-data", (req, res) => {
  const model = new Model({
    text0: req.body.text0,
    text1: req.body.text1,
    options: req.body.options,
    sectionsMinutesBegin: req.body.sectionsMinutesBegin,
    sectionsHoursBegin: req.body.sectionsHoursBegin,
    sectionsMinutesEnd: req.body.sectionsMinutesEnd,
    sectionsHoursEnd: req.body.sectionsHoursEnd
  });
  model.save().then(data => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.listen(3000, () => {
  console.log("server running");
});
