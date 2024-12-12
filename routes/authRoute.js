import express from 'express';
import db from '../config/db.js'; // Adjust the import based on your database configuration
import crypto from 'crypto';

const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {
    const { name, mobile, email } = req.body;

    // Basic validation
    if (!name || !mobile || !email) {
        return res.status(400).json({ message: 'Name, mobile, and email are required.' });
    }

    const otp = crypto.randomInt(100000, 999999).toString(); // Generate OTP
    const otpGeneratedTime = new Date(); // Record the time OTP is generated

    try {
        // Check if user already exists
        const [existingUser] = await db.query('SELECT * FROM users WHERE mobile = ? OR email = ?', [mobile, email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists with this mobile number or email.' });
        }

        // Insert the new user with the generated OTP
        await db.query('INSERT INTO users (name, mobile, email, otp, otpGeneratedTime) VALUES (?, ?, ?, ?, ?)', 
            [name, mobile, email, otp, otpGeneratedTime]);

        // In a real application, you might send an OTP to the user here
        return res.status(201).json({ message: 'User registered successfully.', otp }); // Include OTP for testing
    } catch (error) {
        console.error('Error during registration:', error.message);
        return res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
});

// Endpoint for checking if the mobile number is registered
router.post('/check-mobile', async (req, res) => {
    const { mobile } = req.body;

    // Validate the mobile number
    if (!mobile || !/^(0)?\d{10}$/.test(mobile)) {
        return res.status(400).json({ message: 'Invalid mobile number.' });
    }

    try {
        // Query the database to check if the mobile number is registered
        const result = await db.query('SELECT * FROM users WHERE mobile = ?', [mobile]);

        if (result.length > 0) {
            // Mobile number exists, grant access to the next step
            return res.status(200).json({ message: 'Mobile number exists.', registered: true });
        } else {
            // Mobile number is not registered, prompt to register
            return res.status(200).json({ message: 'Mobile number not registered.', registered: false });
        }
    } catch (error) {
        console.error('Error checking mobile number:', error.message);
        return res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
});

// Export the router
export default router;
