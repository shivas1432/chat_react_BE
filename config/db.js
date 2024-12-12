import pkg from 'pg'; // Default import for pg
const { Pool } = pkg;  // Destructure to get Pool

import dotenv from 'dotenv';  


dotenv.config();

// Create a connection pool for PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,  // Use the PostgreSQL DATABASE_URL environment variable
    ssl: {
        rejectUnauthorized: false,  // Allow self-signed certificates (important for Render SSL)
    },
});

// Function to test the connection
const testConnection = async () => {
    try {
        const res = await pool.query('SELECT NOW()');  // Test query to check connection
        console.log('Connected to the database:', res.rows);  // Display the current timestamp from the database
    } catch (err) {
        console.error('Database connection failed:', err.message);  // Catch and log errors
    }
};

// Test the connection when the module is loaded
testConnection();

// Export the pool for use in other files
export default pool;
