// jshint esversion:6
exports.insertData = function insertData(UserDB, AddressDB, fullData, res){
  var userData = new UserDB({
    firstname: fullData.firstName,
    lastname: fullData.lastName,
    mobile: fullData.Mobile,
    mail: fullData.email,
    password: fullData.password
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
}
