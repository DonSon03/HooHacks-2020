const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const consumerSchema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 10
  },
}, {
  timestamps: true,
});

const User = mongoose.model('Consumer', consumerSchema);

module.exports = User;