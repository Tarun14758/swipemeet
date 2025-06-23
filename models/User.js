const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,             // ✅ Add this
  gender: String,          // ✅ Add this
  bio: String              // ✅ Add this
});

module.exports = mongoose.model('User', userSchema);
