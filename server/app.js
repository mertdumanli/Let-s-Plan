const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./Model");

app.use(bodyParser.json());

const Model = mongoose.model("model");
const ModelRegister = mongoose.model("modelRegister");
const ModelLesson = mongoose.model("modelLesson");

const mongoUri =
  "uri";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("error", err);
});

app.get("/", (req, res) => {
  Model.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-data", (req, res) => {
  const model = new Model({
    type: req.body.type,
    text0: req.body.text0,
    text1: req.body.text1,
    options: req.body.options,
    sectionsMinutesBegin: req.body.sectionsMinutesBegin,
    sectionsHoursBegin: req.body.sectionsHoursBegin,
    sectionsMinutesEnd: req.body.sectionsMinutesEnd,
    sectionsHoursEnd: req.body.sectionsHoursEnd,
    picture: req.body.picture,
  });
  model
    .save()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});








//Lesson

app.get("/lesson-get", (req, res) => {
  ModelLesson.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/lesson-post", (req, res) => {
  const model = new ModelLesson({
    username: req.body.username,
    password: req.body.password,
    text0: req.body.text0,
    text1: req.body.text1,
    texts: req.body.texts,
    picture: req.body.picture,
    pictureBoolean: req.body.pictureBoolean,
    maxDay: req.body.maxDay,
    maxLesson: req.body.maxLesson,
  });
  model.save().catch((err) => {
    console.log(err);
  });
});


//Login and Register Methods
app.get("/register-get", (req, res) => {
  ModelRegister.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/register-post", (req, res) => {
  const model = new ModelRegister({
    username: req.body.username,
    password: req.body.password,
  });
  model
    .save()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log("server running");
});