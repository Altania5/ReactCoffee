const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 6,
    select: false
  },role: {
    type: String,
    enum: ['customer', 'owner'],
    default: 'customer'
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;