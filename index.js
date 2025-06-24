const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

app.use(cors({
  origin: "https://tarun14758.github.io",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.options('*', cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

console.log("✅ Registering routes...");
app.use('/api/users', userRoutes);  // ✅ CORRECT
app.use('/api/posts', postRoutes);  // ✅ CORRECT

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
