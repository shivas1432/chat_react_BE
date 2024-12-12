import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name, screen_name FROM twitter_users');

        if (rows.length === 0) {
            return res.status(404).json({ message: "No users found." });
        }

        res.json(rows);
    } catch (error) {
        console.error("Failed to fetch users:", error);
        res.status(500).json({ message: "Database query failed" });
    }
});

export default router;
