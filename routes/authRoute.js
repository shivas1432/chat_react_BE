import express from 'express';
import db from '../config/db.js'; // Adjust the import based on your database configuration
import crypto from 'crypto';
import validator from 'validator';  // To validate email format

const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {
    const { name, mobile, email } = req.body;

    // Basic validation for required fields
    if (!name || !mobile || !email) {
        return res.status(400).json({ message: 'Name, mobile, and email are required.' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Generate OTP (6-digit random number)
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpGeneratedTime = new Date(); // Record the time OTP is generated

    try {
        // Check if user already exists (by mobile or email)
        const result = await db.query(
            'SELECT * FROM users WHERE mobile = $1 OR email = $2',
            [mobile, email]
        );
        
        if (result.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists with this mobile number or email.' });
        }

        // Insert the new user with the generated OTP
        await db.query(
            'INSERT INTO users (name, mobile, email, otp, otpGeneratedTime, isVerified) VALUES ($1, $2, $3, $4, $5, $6)', 
            [name, mobile, email, otp, otpGeneratedTime, false] // Default isVerified as false
        );

        // In a real application, you would send the OTP to the user here via SMS/email

        // Respond with success (you can remove OTP in production)
        return res.status(201).json({ message: 'User registered successfully.' }); // Omit OTP for security reasons
    } catch (error) {
        console.error('Error during registration:', error.message);
        return res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
});

// Endpoint for checking if the mobile number is registered
router.post('/check-mobile', async (req, res) => {
    const { mobile } = req.body;

    // Validate mobile number (check if it's 10 digits or 11 digits with a leading 0)
    if (!mobile || !/^(0)?\d{10}$/.test(mobile)) {
        return res.status(400).json({ message: 'Invalid mobile number.' });
    }

    try {
        // Query the database to check if the mobile number is registered
        const result = await db.query(
            'SELECT * FROM users WHERE mobile = $1', 
            [mobile]
        );

        if (result.rows.length > 0) {
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
