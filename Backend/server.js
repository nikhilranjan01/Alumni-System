require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const alumniRoutes = require('./routes/alumniRoutes');

const app = express();

/* 🔐 CORS */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());

/* 🔥 DB */
const mongoUri = process.env.DATABASE || 'mongodb://localhost:27017/alumni';
connectDB(mongoUri);

/* Routes */
app.use('/api/users', userRoutes);
app.use('/api/alumni', alumniRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

/* Frontend build serve */
app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

/* Error handler */
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Server error' });
});

/* 🔥 PORT fix */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
