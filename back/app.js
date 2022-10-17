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

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');



/**
 * ** Connexion à la base de données MongoDB via Mongoose **
 */

mongoose.connect(
`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_NAME}/?retryWrites=true&w=majority`,
{ useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
  // Appel de l'application express.
  const app = express();

  /**
  * Analyser du corps de la requête au format JSON,
  * venant de l'application front-end.
  */
    
  app.use(express.json());
  
  /**
   * ** Création d'un header : **
   * #. Débloque les erreus CORS
   * #. Autorise l'acces à notre API
   */
  
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Acces à l'API selon n'importe quel origine ('*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // ajout des headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // envoie des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
    next();
  });
  


// Importation du segment d'origine des routes 
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

// Exportation de cette constante pour pouvoir y accéder dans d'autres fichiers
module.exports = app;