var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var db = require("./models");
var app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + "/public/"));

app.listen(3000);

module.exports = server;
