const mongoose = require("mongoose");
const { use } = require("react");
const {Schema}= mongoose;
const userSchema = new Schema({
    name: String,
    email: {type:String, unique:true},
    password: String,
    address: String,
    phone_no: Number,
    }, {collection: 'User'});

const Register = new mongoose.model("User", userSchema);

module.exports = Register;