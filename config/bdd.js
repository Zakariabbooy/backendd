const mongoose = require('mongoose');

const bddConnect = async () => {
    // URL de connexion MongoDB (préférer la variable d'environnement en local)
    const defaultAtlas = "mongodb+srv://anaselm83_db_user:JvBNBY5B3AUvpGQJ@projet-pfa.8bzpfnl.mongodb.net/projet-pfa?retryWrites=true&w=majority&appName=Projet-PFA";
    const mongodb_url = process.env.MONGODB_URI || defaultAtlas;

    try {
        console.log('Connecting to the database...');
        
        // Options minimales pour éviter les problèmes SSL/TLS
        const options = {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            // Désactiver la validation SSL stricte temporairement pour tester
            // ATTENTION: À utiliser uniquement en développement
            tlsAllowInvalidCertificates: true,
            tlsAllowInvalidHostnames: true,
        };

        await mongoose.connect(mongodb_url, options);
        console.log('base de donne connected');
        console.log('Database name:', mongoose.connection.name);
        console.log('Database host:', mongoose.connection.host);
    } catch (error) {
        console.error('❌ Error connecting to the database:', error.message);
        
        if (error.message.includes('authentication failed') || error.code === 8000) {
            console.error('⚠️  Problème d\'authentification');
            console.error('Vérifiez votre nom d\'utilisateur et mot de passe');
        } else if (error.message.includes('SSL') || error.message.includes('TLS') || error.code === 'ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR') {
            console.error('⚠️  Problème SSL/TLS détecté');
            console.error('Cela peut être dû à:');
            console.error('  - Incompatibilité entre Node.js 24 et MongoDB');
            console.error('  - Problème de firewall/antivirus');
            console.error('  - Problème de réseau');
            console.error('\n💡 Essayez:');
            console.error('  1. Redémarrer votre routeur/modem');
            console.error('  2. Désactiver temporairement l\'antivirus');
            console.error('  3. Vérifier que votre IP est autorisée dans MongoDB Atlas');
            console.error('  4. Essayer avec une version antérieure de Node.js (18 ou 20)');
        } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
            console.error('⚠️  Problème de connexion réseau');
            console.error('Vérifiez votre connexion internet');
        } else if (error.message.includes('timeout')) {
            console.error('⚠️  Timeout de connexion');
            console.error('Le serveur MongoDB ne répond pas');
        }
        
        console.error('\n💡 Solutions possibles:');
        console.error('1. Vérifiez votre connexion internet');
        console.error('2. Vérifiez que votre IP est autorisée dans MongoDB Atlas (Network Access)');
        console.error('3. Vérifiez vos identifiants (username/password)');
        console.error('4. Vérifiez que le cluster MongoDB est actif');
        console.error('5. Essayez de redémarrer le serveur\n');
    }
};

// Gestion des événements de connexion
mongoose.connection.on('connected', () => {
    console.log('✅ Mongoose connected to MongoDB');
    console.log('✅ Connection state: CONNECTED');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err.message);
    console.error('❌ Connection state: ERROR');
});

mongoose.connection.on('disconnected', () => {
    console.log('⚠️  Mongoose disconnected');
    console.log('⚠️  Connection state: DISCONNECTED');
});

// Fonction pour vérifier l'état de la connexion
const checkConnection = () => {
    const state = mongoose.connection.readyState;
    const states = {
        0: 'DISCONNECTED',
        1: 'CONNECTED',
        2: 'CONNECTING',
        3: 'DISCONNECTING'
    };
    console.log(`📊 Connection state: ${states[state] || 'UNKNOWN'}`);
    return state === 1; // 1 = CONNECTED
};

// Gérer la déconnexion proprement
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
});

// Exporter la fonction de vérification
module.exports = bddConnect;
module.exports.checkConnection = checkConnection;