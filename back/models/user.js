/**
 * Importation de mongoose
 * Importation du plugin *uniqueValidator*
 */
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

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

  const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  });

userSchema.plugin(uniqueValidator);

//Exportation du schéma en tant que modèle Mongoose.
module.exports = mongoose.model('user', userSchema);