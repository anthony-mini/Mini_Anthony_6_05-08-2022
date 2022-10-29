/**
* Importation d'express avec la commande ** require **
*
* Importation de moongose avec la methode ** require **
*
* Importation des routes. Sauce & User.
*
*/

const express = require('express');
require("dotenv").config();
const mongoose = require('mongoose');

const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit')

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Appel de l'application express.
const app = express();

/**
* ** Fonction limitant le nombre de requête pour un utilisateur avec le package : Express-rate-limit **
* https://www.npmjs.com/package/express-rate-limit
*/

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 300, // Limitez chaque IP à 300 demandes par `fenêtre` (ici, par 10 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/**
* ** Connexion à MongoDB via Mongoose **
*/

mongoose.connect(
`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_NAME}/?retryWrites=true&w=majority`,
{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
 

/** 
* Analyser du corps de la requête au format JSON, venant de l'application front-end.
*/
    
app.use(express.json());

/**
* Sécurisation de l'application Express avec le package : Helmet
* https://www.npmjs.com/package/helmet
*/

app.use(
  helmet({
    crossOriginResourcePolicy: false, // Désactive la sécurité lors de la récupération des images.
    contentSecurityPolicy : false, // Désactive la sécurité lors de l'intération avec la modification des sauces.
  })
);
 
// Appel de la fonction Limiter.
app.use(limiter);
 
/**
  * ------ CORS ------
  * ** Création d'un header **
  * #. Débloque les erreus CORS
  * #. Autorise l'acces à notre API :
  *     . Configure quels headers sont authorisés
  *     . Configure quels méthodes sont authorisés
*/
 
app.use((req, res, next) => {

    // Acces à l'API selon n'importe quel origine ('*')
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    // Ajout des headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
    // Envoie des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
  
    next();
});
  
/**
 * ----- ROUTING -----
 * Importation des segments d'origine des routes 
 */ 

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


// Exportation de cette constante pour pouvoir y accéder dans d'autres fichiers
module.exports = app;