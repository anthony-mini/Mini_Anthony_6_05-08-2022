/**
* Importation d'express avec la commande `require`
*
* Constante *app* qui fera appel à la méthode `express()`qui permet l'appel de l'application express.
*
* Méthode `use`. Pour que le serveur Node retourne une réponse en fonction de l'application Express. --> Envoie d'une réponse en Json avec l'objet `message`.
*
* Exportation de cette constante pour pouvoir y accéder dans d'autres fichiers
*/

const express = require('express');

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

module.exports = app;