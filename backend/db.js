const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://shourjya19b:shourjya19%40mongodb@cluster0.vrapmk7.mongodb.net/"
);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
