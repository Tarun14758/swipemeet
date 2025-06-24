const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Use env variable for MongoDB URI
const MONGO_URI = process.env.MONGODB_URI;

// ✅ Setup CORS to allow requests from GitHub Pages frontend
app.use(cors({
  origin: "https://tarun14758.github.io",  // ✅ GitHub Pages URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Handle preflight OPTIONS requests
app.options('*', cors());

// ✅ Middleware for JSON and serving static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// ✅ Connect to MongoDB and start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
  });
