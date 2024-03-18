const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isVIP: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);

userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
