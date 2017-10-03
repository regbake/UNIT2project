var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var request = require("request");
var multer = require("multer");
var fs = require("fs");
var upload = multer({dest: './uploads/'});
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
    console.log(authors.authors.length);
    res.render("index", {authors: authors});
  })
});

//handle the uploaded files
app.post("/upload", upload.single("myFile"), function(req, res){
  console.log(req.file);
  //now delete all the files in the upload folder
  fs.readdir('./uploads', function(err, items) {
  items.forEach(function(file) {
      fs.unlink('./uploads/' + file);
      //console.log('Deleted ' + file);
    });
  });
  res.redirect("/");
});

app.listen(3000);

// module.exports = server;
