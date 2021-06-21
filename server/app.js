const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./Model");

app.use(bodyParser.json());

const ModelRegister = mongoose.model("modelRegister");
const ModelStreaming = mongoose.model("modelStreaming");
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

app.listen(3000, () => {
  console.log("server running");
});

//-----------------------------------------------------------------------------------
//Register Methods
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
    uname: req.body.uname,
    pass: req.body.pass,
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



//-----------------------------------------------------------------------------------
//Streaming methods
app.get("/streaming-get", (req, res) => {
  ModelStreaming.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/streaming-post", (req, res) => {
  const model = new ModelStreaming({
    uname: req.body.uname,
    pass: req.body.pass,
    text0: req.body.text0,
    text1: req.body.text1,
    texts: req.body.texts,
    hoursBegin: req.body.hoursBegin,
    minutesBegin: req.body.minutesBegin,
    pieceTimes: req.body.pieceTimes,
    currentDate: req.body.currentDate,
    picture: req.body.picture,
    pictureBoolean: req.body.pictureBoolean,
    options: req.body.options,
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

app.post('/streaming-update',(req,res)=>{
  ModelStreaming.findByIdAndUpdate(req.body.id,{
    uname: req.body.uname,
    pass: req.body.pass,
    text0: req.body.text0,
    text1: req.body.text1,
    texts: req.body.texts,
    hoursBegin: req.body.hoursBegin,
    minutesBegin: req.body.minutesBegin,
    pieceTimes: req.body.pieceTimes,
    currentDate: req.body.currentDate,
    picture: req.body.picture,
    pictureBoolean: req.body.pictureBoolean,
    options: req.body.options,
  }).then(data=>{
      console.log(data)
      res.send(data)
  })
  .catch(err=>{
      console.log(err)
  })
})



//-----------------------------------------------------------------------------------
//Lesson methods
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
    uname: req.body.uname,
    pass: req.body.pass,
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
