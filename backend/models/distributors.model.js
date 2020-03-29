const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const distributorSchema = new Schema({
    pharmacyName: { 
        type: String, 
        required: true,
      },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
}, {
  timestamps: true,
});

const Exercise = mongoose.model('Distributor', distributorSchema);

module.exports = Exercise;