const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;

const Schema = mongoose.Schema;

// Connect to MongoDB
mongoose
  .connect(db, { useMongoClient: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model('users', UserSchema);