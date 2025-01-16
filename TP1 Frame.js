const express = require('express');
const app = express();
const port = 3000;

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API des utilisateurs !');
});

// Données fictives d'utilisateurs
let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// 1. Route GET : Liste des utilisateurs
app.get('/users', (req, res) => {
    res.json(users);
});

// 2. Route POST : Ajouter un utilisateur
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

// 3. Route GET : Récupérer un utilisateur par ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Utilisateur non trouvé');
    res.json(user);
});

// 4. Route PUT : Mettre à jour un utilisateur
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Utilisateur non trouvé');
    Object.assign(user, req.body);
    res.json(user);
});

// 5. Route DELETE : Supprimer un utilisateur
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Utilisateur non trouvé');
    users.splice(index, 1);
    res.json({ message: 'Utilisateur supprimé' });
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
