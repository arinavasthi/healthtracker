import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/User.js';

const app = express();
const PORT = process.env.PORT || 5000;

// JWT Secret configuration
const JWT_SECRET = 'd45228164c0aa8031aff8ef7c9ba845cd73054adab3a099841d798936cc35b8d2d6b374a5e78f690941100e85d79c900ef6dd791fd69f2530b1fae96c30f5dbd20c76e2f015a8f0b33d9a36b2ace2448387953fa4cb73b1008993bfcb64333ebb677a3111fdb9111704bbb4a7b5d49f2a1f889d207a9f33cce524b640c1011faa0291aeb1e52eefc495f88ce99ccb0416451d0ac4abcc44d97fb1984b5b0e90a4c0b6314b6fb2a87c09e320ebd7db9e66130eaef29b0d4bc546dd175811b7a47ee1f0eb8aacfe744c55b393c58324522d73e88a555495017533e5ac2c7651b8bea05d2fc4710b79dd43791ec4186d7e504b7b3ef94de960d5c8ae925b88565af';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/fitness-track', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected to localhost'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/user', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

// Export JWT secret for use in other files
export { JWT_SECRET };
