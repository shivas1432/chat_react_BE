import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Route to get user profile by ID
router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        // Fetching the profile data including the profile image URL
        const [result] = await db.query('SELECT id, name, screen_name, profile_image_url, profile_banner_url FROM twitter_users WHERE id = ?', [userId]);

        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the profile data back, including image URLs
        res.json(result[0]);
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        res.status(500).json({ message: "Database query failed" });
    }
});

export default router;
