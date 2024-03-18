const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function to handle user signup
exports.signup = async (req, res) => {
    try {
        const { email, firstName, lastName, password, isVIP, isAdmin } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new User({
            email,
            firstName,
            lastName,
            password: hashedPassword,
            isVIP: isVIP || false,
            isAdmin: isAdmin || false
        });

        // Save user to database
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up user.' });
    }
};

// Function to handle user signin
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const existingUser = await User.findOne({ email });

        // Check if user exists and password is correct
        if (!existingUser || !await bcrypt.compare(password, existingUser.password)) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email },
            'secret', // Replace 'secret' with your secret key
            { expiresIn: '1h' }
        );

        // Respond with token
        res.status(200).json({ token, userId: existingUser._id });
    } catch (error) {
        res.status(500).json({ message: 'Error signing in user.' });
    }
};