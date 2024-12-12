import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import friendsRoute from './routes/friendsRoute.js';
import profileRoute from './routes/ProfileRoute.js';
import authRoute from './routes/authRoute.js'; // Correct import for authRoute.js

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Test route to confirm server is up
app.get("/", (req, res) => {
    res.send("Server is up and running!");
});

// Register routes
app.use('/api/friends', friendsRoute);
app.use('/api/profile', profileRoute);
app.use('/api', authRoute);  // Ensure this is correctly placed for authRoute

// Catch-all for undefined routes
app.use((req, res) => {
    res.status(404).send({ message: "Endpoint not found" });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
