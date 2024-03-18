const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signupService = async (userData) => {
    const { email, password, isVIP, isAdmin } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
        email,
        password: hashedPassword,
        isVIP: isVIP || false,
        isAdmin: isAdmin || false
    });

    // Save user to database
    await newUser.save();

    return newUser;
};

const signinService = async (credentials) => {
    const { email, password } = credentials;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET, // Use environment variable for the secret
        { expiresIn: '1h' }
    );

    return { user, token };
};

module.exports = {
    signupService,
    signinService
};