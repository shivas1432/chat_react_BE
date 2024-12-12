import mysql from 'mysql2/promise'; // Promise-compatible import
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// Function to test the connection
const testConnection = async () => {
    try {
        const connection = await db.getConnection();
        console.log('Connected to the database.');
        connection.release(); // Release the connection back to the pool
    } catch (err) {
        console.error('Database connection failed:', err.message);
    }
};

// Test the connection when the module is loaded
testConnection();

export default db;
