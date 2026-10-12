require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Member Schema & Model
const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNumber: { type: String, required: true },
    club: { type: String, required: true },
    role: { type: String, default: 'Member' },
    email: { type: String, required: true },
    joinedAt: { type: Date, default: Date.now }
});

const Member = mongoose.model('Member', memberSchema);

// In-memory fallback if MongoDB is not reachable
let inMemoryMembers = [
    { _id: '1', name: 'Arun Kumar', rollNumber: '22BIT001', club: 'Coding Club', role: 'Lead', email: 'arun@example.com', joinedAt: new Date() },
    { _id: '2', name: 'Priya Sharma', rollNumber: '22BIT045', club: 'Robotics Club', role: 'Co-Lead', email: 'priya@example.com', joinedAt: new Date() },
    { _id: '3', name: 'Rahul V', rollNumber: '22BIT089', club: 'Design Club', role: 'Member', email: 'rahul@example.com', joinedAt: new Date() }
];

let isDbConnected = false;

// Connect to MongoDB
if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 })
        .then(() => {
            console.log('Successfully connected to MongoDB.');
            isDbConnected = true;
        })
        .catch(err => {
            console.warn('MongoDB connection failed. Operating in fallback mock mode:', err.message);
            isDbConnected = false;
        });
} else {
    console.warn('MONGODB_URI not provided. Running in demo mock mode.');
}

// Routes
// 1. Health check & status
app.get('/api/health', (req, res) => {
    res.json({
        status: 'UP',
        service: 'Campus Club Members Directory API',
        databaseConnected: mongoose.connection.readyState === 1,
        timestamp: new Date().toISOString()
    });
});

// 2. Get all members
app.get('/api/members', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const members = await Member.find().sort({ joinedAt: -1 });
            return res.json(members);
        }
        res.json(inMemoryMembers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch members' });
    }
});

// 3. Add a new member
app.post('/api/members', async (req, res) => {
    const { name, rollNumber, club, role, email } = req.body;
    if (!name || !rollNumber || !club || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        if (mongoose.connection.readyState === 1) {
            const newMember = new Member({ name, rollNumber, club, role: role || 'Member', email });
            const savedMember = await newMember.save();
            return res.status(201).json(savedMember);
        }
        const fallbackMember = {
            _id: String(Date.now()),
            name,
            rollNumber,
            club,
            role: role || 'Member',
            email,
            joinedAt: new Date()
        };
        inMemoryMembers.unshift(fallbackMember);
        res.status(201).json(fallbackMember);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save member: ' + error.message });
    }
});

// Export app for serverless platforms like Vercel
module.exports = app;

if (process.env.NODE_ENV !== 'test' && require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
