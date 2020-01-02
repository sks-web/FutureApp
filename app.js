// jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const services = require(__dirname+"/services/controller.js");
const dbconnect = require(__dirname+"/Dbconnect/dbconnect.js");
const userdata = require(__dirname+"/Schema/userdata.js");
const useraddress = require(__dirname+"/Schema/useraddress.js");
// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRound = 5;


const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

// Database Part
dbconnect.dbConnect(mongoose);
const Schema = mongoose.Schema;
  // Schema Part

let addressSchema;
useraddress.addressSchema(mongoose, Schema, function(data){
  addressSchema = data;
});
const AddressDB = mongoose.model("AddressDB", addressSchema);
let userSchema;
userdata.userSchema(mongoose, Schema, AddressDB, function(data){
  userSchema = data;
});
// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });
const UserDB = mongoose.model("UserDB", userSchema);

app.get("/", function(req, res){
  res.render("index");
});

app.get("/login", function(req, res){
  res.render("login",{msg:""});
});

app.get("/registration", function(req, res){
  res.render("registration",{msg:""});
});

app.post("/login", function(req, res){
  var fullData = req.body;
  services.checkUser(UserDB, fullData, res, bcrypt);
});

app.post("/registration", function(req, res){
  var fullData = req.body;
  console.log(fullData);
  if(fullData.password==fullData.cpassword){
    services.insertData(UserDB, AddressDB, fullData, res, bcrypt);
  } else {
    res.render("registration",{msg:"password and confirm password does not matched"});
  }
});

app.listen(3000,function(err){
  console.log("Server start at port 3000");
});
