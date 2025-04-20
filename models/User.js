const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  portfolio: [{
    symbol: String,
    shares: Number,
    purchasePrice: Number,
    currentPrice: Number
  }]
});

module.exports = mongoose.model('User', userSchema);