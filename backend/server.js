const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoUrl = "mongodb://127.0.0.1:27017"; // Replace with your MongoDB connection string
const client = new MongoClient(mongoUrl, { serverSelectionTimeoutMS: 5000 }); // Added a 5-second timeout
let db;

async function startServer() {
    try {
        console.log("MongoDB se connect karne ki koshish kar raha hoon...");
        await client.connect();
        db = client.db('swasthya'); // Database name
        console.log('MongoDB se successfully connect ho gaya.');

        app.listen(port, () => {
            console.log(`Backend server http://localhost:${port} par chal raha hai`);
        });
    } catch (err) {
        console.error("\nMongoDB connection error. Make sure the MongoDB server is running on your computer.", err.message);
    }
}

// Test Route to check if server is running
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

startServer();

// ==========================
// API Endpoints: Patients
// ==========================

app.get('/api/patients', async(req, res) => {
    try {
        const patients = await db.collection('patients').find({}).toArray();
        res.json({ message: "success", data: patients });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/patients', async(req, res) => {
    const { name, age, condition } = req.body;
    if (!name || !age) {
        return res.status(400).json({ error: "Name aur age zaroori hai" });
    }
    try {
        const result = await db.collection('patients').insertOne({ name, age, condition });
        res.status(201).json({
            message: "Patient successfully add ho gaya",
            data: { id: result.insertedId, name, age, condition }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/patients/:id', async(req, res) => {
    try {
        const result = await db.collection('patients').deleteOne({ _id: new ObjectId(req.params.id) });
        res.json({ message: "deleted", changes: result.deletedCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================
// API Endpoints: Authentication
// ==========================

// Register User
app.post('/api/register', async(req, res) => {
    const { fullName, email, password, role } = req.body;
    const patientId = role === 'patient' ? `PAT-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}` : null;
    const isApproved = role === 'admin' ? 1 : 0; // Auto-approve admins so they can log in immediately

    const newUser = {
        fullName,
        email,
        password, // In a real app, you MUST hash the password
        role: role || 'patient',
        patientId,
        isApproved
    };

    try {
        const result = await db.collection('users').insertOne(newUser);
        res.json({ message: "Registered successfully", userId: result.insertedId, patientId });
    } catch (err) {
        console.error("Registration Error:", err.message);
        res.status(400).json({ error: "User with this email may already exist." });
    }
});

// Login User
app.post('/api/login', async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.collection('users').findOne({ email, password });
        if (user) {
            // Auto-approve admin on login if not already approved (Fix for existing admins)
            if (user.role === 'admin' && user.isApproved !== 1) {
                await db.collection('users').updateOne({ _id: user._id }, { $set: { isApproved: 1 } });
                user.isApproved = 1;
            }

            // In MongoDB, the _id is an object. We convert it to a string for consistency.
            const { _id, ...userWithoutId } = user;
            res.json({
                message: "Login successful",
                user: { id: _id.toString(), ...userWithoutId, name: user.fullName }
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================
// API Endpoints: Admin
// ==========================

// Get Admin Stats
app.get('/api/admin/stats', async(req, res) => {
    try {
        const totalUsers = await db.collection('users').countDocuments();
        const totalDoctors = await db.collection('users').countDocuments({ role: 'doctor' });
        const qrGenerated = await db.collection('users').countDocuments({ patientId: { $ne: null } });

        res.json({
            totalUsers,
            totalDoctors,
            qrGenerated
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Pending Users
app.get('/api/admin/pending-users', async(req, res) => {
    try {
        // Find users where isApproved is 0 OR missing (for older records)
        const users = await db.collection('users').find({
            $or: [{ isApproved: 0 }, { isApproved: { $exists: false } }]
        }, { projection: { password: 0 } }).toArray();

        const usersWithId = users.map(user => ({...user, id: user._id.toString() }));
        res.json({ success: true, data: usersWithId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Approve User
app.post('/api/admin/approve-user/:id', async(req, res) => {
    const { id } = req.params;
    try {
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid User ID format" });
        }
        const result = await db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: { isApproved: 1 } });
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User approved successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get Patient Details by ID (For Doctor Scan)
app.get('/api/patients/view/:patientId', async(req, res) => {
    const { patientId } = req.params;
    try {
        const user = await db.collection('users').findOne({ patientId });
        if (user) {
            // Return real user info + mock medical records (since we don't have full EMR table yet)
            res.json({
                success: true,
                data: {
                    name: user.fullName,
                    id: user.patientId,
                    email: user.email,
                    age: 35, // Mock data
                    bloodType: "O+", // Mock data
                    history: ["Hypertension (Controlled)", "Type 2 Diabetes", "Allergic to Penicillin"], // Mock data
                    recentRecords: [
                        { title: "Blood Test Report", date: "Jan 15, 2026", status: "Normal ✅" },
                        { title: "X-Ray Report", date: "Dec 10, 2025", status: "Clear ✅" }
                    ]
                }
            });
        } else {
            res.status(404).json({ success: false, message: "Patient not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Doctors
app.get('/api/doctors', async(req, res) => {
    try {
        const doctors = await db.collection('users').find({ role: 'doctor', isApproved: 1 }, { projection: { fullName: 1 } }).toArray();
        res.json({ success: true, data: doctors });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================
// API Endpoints: Appointments
// ==========================

// Book Appointment
app.post('/api/appointments', async(req, res) => {
    const { patientName, doctorName, date } = req.body;
    try {
        const result = await db.collection('appointments').insertOne({ patientName, doctorName, date, status: 'Scheduled' });
        res.json({ message: "Appointment booked successfully", id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Appointments (For Doctor)
app.get('/api/appointments', async(req, res) => {
    try {
        const appointments = await db.collection('appointments').find({}).sort({ date: -1 }).toArray();
        res.json({
            success: true,
            data: appointments
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});