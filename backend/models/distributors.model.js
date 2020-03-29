const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const distributorSchema = new Schema({
    pharmacyName: { 
        type: String, 
        required: true,
      },
    companyNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      },
    address: {type: String},
    toiletPaper: {type: String},
    mask: {type: String},
    handSanitizers: {type: String},
    descriptions: {type: String},
    unique_id: {type: String},
    phone_list: {type: [String]}
}, {
  timestamps: true,
});

const Exercise = mongoose.model('Distributor', distributorSchema);

module.exports = Exercise;