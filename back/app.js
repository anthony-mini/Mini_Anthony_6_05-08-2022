/**
* Importation d'express avec la commande `require`
*
* Constante *app* qui fera appel à la méthode `express()`qui permet l'appel de l'application express.
*
* Exportation de cette constante pour pouvoir y accéder dans d'autres fichiers
*/

const express = require('express');

const app = express();

module.exports = app;