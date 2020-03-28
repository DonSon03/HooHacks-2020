const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const distributorSchema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 10
  },
  address: { 
    type: String, 
    required: true,
    unique: true, 
  },
}, {
  timestamps: true,
});

const Exercise = mongoose.model('Distributor', distributorSchema);

module.exports = Exercise;