const express = require('express');
const app = express();
const port = 3000;

// Middleware pour lire les requêtes JSON
app.use(express.json());

// Middleware de validation
const validateLogin = (req, res, next) => {
    const { username, password } = req.body; // Lire les champs du corps de la requête
    if (!username || !password) {
        return res.status(400).send('Erreur : username et password sont requis.');
    }
    next(); // Passer à la route suivante si tout est valide
};

// Route POST /login
app.post('/login', validateLogin, (req, res) => {
    res.send('Connexion réussie !');
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
