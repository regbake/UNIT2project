var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var request = require("request");

//multer shiz
var multer = require("multer");
var fs = require("fs");
var storage = multer.memoryStorage()
var upload = multer({storage: storage});

var db = require("./models");
var app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + "/public/"));

//index page, handles the poetry api stuff
app.get("/", function(req, res){
  var poetryUrl = "http://poetrydb.org/author";

  request(poetryUrl, function(error, response, body){
    var authors = JSON.parse(body);
    res.render("index", {authors: authors});
  })
});

//handle the uploaded files
app.post("/upload", upload.single("myFile"), function(req, res){
  var text = req.file.buffer.toString("utf8");
  userUploads.push(text);
  console.log(userUploads);
  // console.log(text, text.length);
  res.redirect("/");
});

app.listen(3000);

// module.exports = server;
