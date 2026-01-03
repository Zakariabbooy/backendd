require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const userRoutes = require('.routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
connectDB();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
