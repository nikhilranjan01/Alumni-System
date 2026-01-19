require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const alumniRoutes = require('./routes/alumniRoutes');

const app = express();

/* 🔐 CORS */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend.vercel.app" // <-- real Vercel URL daalna
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

/* Health check */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

/* Error handler */
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Server error' });
});

/* 🔥 PORT */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
