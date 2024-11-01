const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.createUser = async ({ userName, password }) => {
    try {
        if (!userName || !password) {
            return { status: 400, message: 'Username and password are required' };
        }

        if (password.length < 6) {
            return { status: 400, message: 'Password must be at least 6 characters' };
        }

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
        console.log(userName, password);
        if (!userName || !password) {
            return { status: 400, message: 'Username and password are required' };
        }

        // Find user by username
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
            { expiresIn: '24h' }
        );

        await User.findByIdAndUpdate(user._id, {onlineStatus: true});
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

module.exports.logoutUser = async (userId) => {
    try {
        await User.findByIdAndUpdate(userId, {onlineStatus: false});
        return { status: 200, message: 'Logout successful' };
    } catch (error) {
        return { status: 500, message: 'Error during logout', error: error.message };
    }
}

module.exports.getUser = async (userId) => {
    try{
        const user = await User.findOne({userName: userId});
        if (!user) {
            return { status: 404, message: 'User not found' };
        }
        return {
            status: 200,
            message: 'User found'
        };
    } catch (error) {
        return { status: 500, message: 'Error getting user', error: error.message };
    }

}