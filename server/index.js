const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const helmet = require('helmet');

// ***********ADJUST
const users = require('./routes/api/users');
//const profile = require('./routes/api/profile');
//const posts = require('./routes/api/posts');

// Connect to DB
const items = require('../database-mongo');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Helmet middleware
app.use(helmet());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('../config/passport')(passport);

// ****************ADJUST Use Routes
app.use('/api/users', users);
//app.use('/api/profile', profile);
//app.use('/api/posts', posts);

app.use(express.static(__dirname + '/../react-client/dist'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));