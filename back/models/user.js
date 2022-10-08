// importation de mongoose
const mongoose = require('mongoose');

/**
 * ** Création du schéma de données **
 * 
 * Utilisation de la fonction ``Schema`` fourni par Mongoose.
 * 
 * Déclaration d'un objet dans la constante ** modelsSauce **, qui comporte les différents champs :
 * #. Une clée, contenant le nom des objets
 * #. Son type (string, number, etc...)
 * #. Et prend le parametre required: true, pour rendre obligatoire chaque champ. 
 */

 const modelsUser = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
  });

//Exportation du schéma en tant que modèle Mongoose.
module.exports = mongoose.model('sauce', modelsUser);