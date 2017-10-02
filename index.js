var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var request = require("request");
var multer = require("multer");
var upload = multer({dest: './uploads/'});
var db = require("./models");
var app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + "/public/"));

app.get("/", function(req, res){
  var poetryUrl = "http://poetrydb.org/author";

  request(poetryUrl, function(error, response, body){
    var authors = JSON.parse(body);
    console.log(authors.authors.length);
    res.render("index", {authors: authors});
  })
});

app.post("/hi", upload.single("myFile"), function(req, res){
  res.send(req.file);
});

app.listen(3000);

// module.exports = server;
