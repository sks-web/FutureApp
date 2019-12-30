// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const services = require(__dirname+"/services/controller.js");
const dbconnect = require(__dirname+"/Dbconnect/dbconnect.js");
const userdata = require(__dirname+"/Schema/userdata.js");
const useraddress = require(__dirname+"/Schema/useraddress.js");

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
const UserDB = mongoose.model("UserDB", userSchema);

app.get("/", function(req, res){
  res.render("index");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/registration", function(req, res){
  res.render("registration",{msg:""});
});

app.post("/login", function(req, res){

});

app.post("/registration", function(req, res){
  var fullData = req.body;
  if(fullData.password==fullData.cpassword){
    services.insertData(UserDB, AddressDB, fullData, res);
  } else {
    res.render("registration",{msg:"password and confirm password does not matched"});
  }
});

app.listen(3000,function(err){
  console.log("Server start at port 3000");
});
