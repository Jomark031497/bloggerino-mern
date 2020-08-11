const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  friends: [{ type: String, default: null }],
  blogs: [{ type: String, default: null }],

}, {
  timestamps: true,
});

const User = model('User', userSchema);

module.exports = User;
