// jshint esversion:6
exports.addressSchema = function addressSchema(mongoose, Schema, callback){
  const addressschema = new mongoose.Schema({
    city: String,
    state: String,
    country: String,
    pin: String
  });
  callback(addressschema);
}
