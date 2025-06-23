const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // ✅ Required for working with folder paths
const userRoutes = require('./routes/user');

const app = express();
const PORT = 5000;

const MONGO_URI = 'mongodb+srv://jyotibijarbia2001:7RzcCcTmOKRnXPiK@cluster0.wsprgoz.mongodb.net/myAppDB?retryWrites=true&w=majority&appName=Cluster0';

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve static frontend files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes (for API calls)
app.use('/api/users', userRoutes);

// Connect to MongoDB and start the server
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`🚀 Server is running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Failed to connect to MongoDB:', err);
    });
