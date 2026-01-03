const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

const bdConnect = require('./config/bdd');  

// Connecter à la base de données (le serveur démarrera même si la connexion échoue)
bdConnect().then(() => {
    console.log('✅ Database ready');
}).catch((error) => {
    console.warn('⚠️  Database connection failed, but server will continue');
});

app.use(cors()); // ✅ autorise React
app.use(express.json());


const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/status', (req, res) => {
    res.send({ status: 'OK' });
});

// Route pour vérifier l'état de la connexion à la base de données
app.get('/db-status', (req, res) => {
    const mongoose = require('mongoose');
    const state = mongoose.connection.readyState;
    const states = {
        0: 'DISCONNECTED',
        1: 'CONNECTED',
        2: 'CONNECTING',
        3: 'DISCONNECTING'
    };
    
    res.json({
        status: states[state] || 'UNKNOWN',
        connected: state === 1,
        database: mongoose.connection.name || 'Not connected',
        host: mongoose.connection.host || 'Not connected'
    });
});

app.get('/time', (req, res) => {
    res.json({ time: new Date().toISOString() });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});