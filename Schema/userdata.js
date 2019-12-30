// jshint esversion:6
exports.userSchema = function userSchema(mongoose, Schema, AddressDB, callback){
  const userschema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    mobile: String,
    mail: String,
    password: String,
    address: {type: Schema.Types.ObjectId, ref: AddressDB }
  });
  callback(userschema);
}
