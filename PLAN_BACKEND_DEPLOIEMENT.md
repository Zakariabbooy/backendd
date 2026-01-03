# Plan Backend & Déploiement

## 1. Structure du Backend (Express + MongoDB Atlas)

```
Back/
  controllers/
    userController.js
    reservationController.js
  routes/
    userRoutes.js
    reservationRoutes.js
  models/
    User.js
    Reservation.js
  config/
    db.js
  .env.example
  server.js
  package.json
```

- **controllers/** : Logique métier (ex: registerUser, createReservation)
- **routes/** : Définition des endpoints API
- **models/** : Schémas Mongoose (User, Reservation)
- **config/db.js** : Connexion à MongoDB Atlas
- **.env.example** : Variables d’environnement à copier en `.env`
- **server.js** : Point d’entrée Express

## 2. Étapes de Déploiement Backend

### A. Prérequis
- Créer un compte MongoDB Atlas et récupérer l’URI
- Créer un compte Render, Railway, Cyclic, ou Heroku

### B. Déploiement
1. **Préparer le projet**
   - Copier `.env.example` en `.env` et remplir les vraies valeurs
   - Vérifier le script `start` dans `package.json` :
     ```json
     "scripts": {
       "start": "node server.js"
     }
     ```
2. **Publier sur GitHub** (optionnel mais recommandé)
3. **Déployer sur Render/Railway/Heroku**
   - Connecter le repo ou uploader le code
   - Ajouter les variables d’environnement dans le dashboard
   - Lancer le déploiement
  - Noter l’URL de l’API (ex: https://votre-backend.onrender.com)

## 3. Étapes de Déploiement Frontend (Vite/React)

1. **Préparer le projet**
   - S’assurer que les appels API pointent vers l’URL du backend déployé
   - Script de build dans `package.json` :
     ```json
     "scripts": {
       "build": "vite build",
       "preview": "vite preview"
     }
     ```
2. **Déployer sur Vercel/Netlify/Render**
   - Connecter le repo ou uploader le dossier `Front`
   - Commande de build : `npm run build`
   - Dossier de sortie : `dist`
   - Ajouter la variable d’environnement REACT_APP_API_URL si besoin
   - Lancer le déploiement
  - Noter l’URL du site (ex: https://votre-site.vercel.app)

## 4. Résumé
- **Backend** : Express, MongoDB Atlas, déployé sur Render/Railway/Heroku
- **Frontend** : Vite/React, déployé sur Vercel/Netlify/Render
- **Variables importantes** : MONGO_URI, PORT, JWT_SECRET, REACT_APP_API_URL

Besoin d’un exemple de configuration pour un service précis ? Demande-moi !
