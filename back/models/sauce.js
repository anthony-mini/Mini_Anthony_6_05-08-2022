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

 const modelsSauce = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    userLiked: { type: String, required: true },
    userDisliked: { type: String, required: true },
  });

//Exportation du schéma en tant que modèle Mongoose.
module.exports = mongoose.model('sauce', modelsSauce);