const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

// @route   POST /api/auth/signup
// @desc    Sign up user
// @access  Public
router.post('/signup', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('firstName', 'Please include first name').not().isEmpty(),
    check('lastName', 'Please include last name').not().isEmpty(),
], authController.signup);

// @route   POST /api/auth/signin
// @desc    Sign in user
// @access  Public
router.post('/signin', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], authController.signin);

module.exports = router;
