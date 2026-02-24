const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
// port ab .env file se aayega, agar nahi mila to 3001 use hoga
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request Logger: Isse aapko pata chalega jab frontend backend ko call karega
app.use((req, res, next) => {
    console.log(`Frontend se request aayi: ${req.method} ${req.url}`);
    next();
});

// MongoDB Connection
// Connection string ab .env file se aayegi
const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
const client = new MongoClient(mongoUrl, { serverSelectionTimeoutMS: 5000 }); // Added a 5-second timeout
let db;

async function startServer() {
    try {
        console.log("MongoDB se connect karne ki koshish kar raha hoon...");
        await client.connect();
        db = client.db('swasthya'); // Database name
        console.log('MongoDB se successfully connect ho gaya.');
    } catch (err) {
        console.error("\nMongoDB connection error. Make sure the MongoDB server is running on your computer.", err.message);
        process.exit(1); // Connection fail hone par process ko exit karein
    }

    // Routes ko setup karein
    const patientRoutes = require('./routes/patients')(db);
    const authRoutes = require('./routes/auth')(db);
    const adminRoutes = require('./routes/admin')(db);
    const doctorRoutes = require('./routes/doctors')(db);
    const appointmentRoutes = require('./routes/appointments')(db);

    // API routes ko mount karein
    app.use('/api', authRoutes); // Handles /api/register and /api/login
    app.use('/api/patients', patientRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/doctors', doctorRoutes);
    app.use('/api/appointments', appointmentRoutes);

    const server = app.listen(port, '0.0.0.0', () => {
        console.log(`Backend server http://localhost:${port} par chal raha hai`);
    });

    // Graceful Shutdown: Jab server band ho to DB connection close karein
    process.on('SIGINT', async() => {
        console.log('\nServer band ho raha hai...');
        await client.close();
        console.log('MongoDB connection band ho gaya.');
        server.close(() => {
            console.log('Server successfully band ho gaya.');
            process.exit(0);
        });
    });
}

startServer();