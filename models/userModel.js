const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: Object
});

mongoose.model('users', userSchema);
