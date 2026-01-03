const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contacts');
const errorHandler = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

const cors = require('cors');

const corsOptions = {
  origin: [
    'http://localhost:3000', 
    'https://colledge-connect-work-4.onrender.com'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/contacts', contactRoutes);

app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});