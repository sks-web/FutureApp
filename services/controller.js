// jshint esversion:6
const saltRounds = 5;
exports.insertData = function insertData(UserDB, AddressDB, fullData, res, bcrypt){
  bcrypt.hash(fullData.password, saltRounds, function(err, hash) {
    var userData = new UserDB({
      firstname: fullData.firstName,
      lastname: fullData.lastName,
      mobile: fullData.Mobile,
      mail: fullData.email,
      password: hash
    });
    var addressData = new AddressDB({
      city: fullData.city,
      state: fullData.state,
      country: fullData.country,
      pin: fullData.pin
    });

    addressData.save(function(err){
      if (err) {
        console.log(err);
      } else {
        userData.address=addressData._id;
        userData.save(function(err){
          if (err) {
            console.log(err);
          } else {
            res.render("registration",{msg:"Successfull Inserted"});
          }
        });
      }
    });
  });
}

exports.checkUser = function checkUser(UserDB, fullData, res, bcrypt){
  UserDB.findOne({mail:fullData.email},function(err, body){
    if(err){
      console.log(err);
    } else {
      if(body!=null){
        bcrypt.compare(fullData.password, body.password, function(err, result) {
          if(result===true){
            res.render("home");
          } else {
            res.render("login", {msg:"Wrong Password!Please enter the password correctly"});
          }
        });
        // if(fullData.password===body.password){
        //   res.render("home");
        // } else {
        //   res.render("login", {msg:"Wrong Password!Please enter the password correctly"});
        // }
      } else {
        res.render("login", {msg:"Wrong mail ID"});
      }
    }
  });
}
