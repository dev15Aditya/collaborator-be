const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.createUser = async ({ userName, password }) => {
    try {
        // Check if user exists
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return { status: 400, message: 'User already exists' };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user with hashed password
        const newUser = await User.create({ 
            userName, 
            password: hashedPassword,  // Make sure password is being saved
            onlineStatus: false,
            room: []
        });

        return { 
            status: 201, 
            message: 'User created successfully',
            userId: newUser._id
        };

    } catch (error) {
        return { status: 500, message: 'Error creating user', error: error.message };
    }
};

module.exports.loginUser = async ({ userName, password }) => {
    try {
        // Find user by username only (not password)
        const user = await User.findOne({ userName });
        if (!user) {
            return { status: 400, message: 'Invalid credentials' };
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return { status: 400, message: 'Invalid credentials' };
        }

        // Generate token with expiration
        const token = jwt.sign(
            { userId: user._id, userName: user.userName },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }  // Add token expiration
        );

        return { 
            status: 200, 
            message: 'Login successful',
            token,
            userName: user.userName
        };
    } catch (error) {
        return { status: 500, message: 'Error during login', error: error.message };
    }
};