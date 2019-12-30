//jshint esversion:6
exports.dbConnect = function dbConnect(mongoose){
  mongoose.connect("mongodb://localhost/loginapp", {useNewUrlParser: true, useUnifiedTopology: true});
};
