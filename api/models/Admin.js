const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: String,
    email: {type:String, unique:true},
    password: String,
    address: String,
    phone_no: Number,
    }, {collection: 'Admin'}
);


module.exports = mongoose.model('Admin', AdminSchema);