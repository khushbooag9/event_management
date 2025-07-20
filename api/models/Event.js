const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  rooms:{
    type: Date,
    required: true
  },
  landl_name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date_added: {
    type: Date,
    required: true,
    default: Date.now,
  },
},{collection: 'Event'});

module.exports = mongoose.model('Event', EventSchema);