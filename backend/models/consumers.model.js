const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const consumerSchema = new Schema({
    firstName: { 
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

const User = mongoose.model('Consumer', consumerSchema);

module.exports = User;