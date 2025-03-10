import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';

const PORT = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Function to start server
const startServer = async () => {
    try {
        await connectDB();  // Connect to MongoDB
        console.log('✅ Database connected successfully');

        // Routes
        app.use('/api/user', userRouter);
        app.get('/', (req, res) => res.send("API working"));

        // Start server
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    } catch (error) {
        console.error('❌ Error starting server:', error);
        process.exit(1); // Exit with failure
    }
};

// Start the server
startServer();
