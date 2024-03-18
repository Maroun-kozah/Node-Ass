const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');


router.post('/signup', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('firstName', 'Please include first name').not().isEmpty(),
    check('lastName', 'Please include last name').not().isEmpty(),
], authController.signup);


router.post('/signin', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], authController.signin);


router.post('/forgot-password', [
    check('email', 'Please include a valid email').isEmail()
], authController.forgotPassword)
module.exports = router;
