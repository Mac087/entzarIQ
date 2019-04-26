const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../../validation/register');
const validateLoginInput = require('../../../validation/login');

// Load User model
const User = require('../../../database-mongo/index');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    }

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    const success = await newUser.save();
    res.json(success);

  } catch (e) {
    console.log('error: ', e);
    return res.status(500).json(e);
  }
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errors.password = 'Password incorrect';
      return res.status(400).json(errors);
    }

    // User Matched
    const payload = { id: user.id, firstName: user.firstName, lastName: user.lastName }; // Create JWT Payload

    // Sign Token
    jwt.sign(
      payload,
      keys.secretOrKey, { expiresIn: 3600 },
      (err, token) => {
        res.json({
          success: true,
          token: 'Bearer ' + token
        });
      }
    );

  } catch (e) {
    console.log('error: ', e);
    return res.status(500).json(e);
  }
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      secret: 'hello'
    });
  }
);

module.exports = router;