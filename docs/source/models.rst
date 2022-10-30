Schéma de données
=================

Sauces
------

.. code-block:: javascript
    :linenos:

    const mongoose = require('mongoose');

    const sauceSchema = mongoose.Schema({
        userId: { type: String, required: true },
        name: { type: String, required: true },
        manufacturer: { type: String, required: true },
        description: { type: String, required: true },
        mainPepper: { type: String, required: true },
        imageUrl: { type: String, required: true },
        heat: { type: Number, required: true },
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0},
        usersLiked: { type: [String], default: [] },
        usersDisliked: { type: [String], default: [] },
    });
    
    module.exports = mongoose.model('Sauce', sauceSchema);

| **Ligne 1 :** Importation de **mongoose**.

| **Ligne 3 à 15 :** Création du schéma de données ``Sauce``.

* Utilisation de la fonction ``Schema`` fourni par **Mongoose**.
* Déclaration de l'objet ``sauceSchema`` qui comporte différents champs : 

    #. Une clée, contenant le nom des objets.
    #. Son type (String, number, etc...)
    #. Son parametre requis. 
    
        * *true* rendant obligatoire chaque champs. 
        * *defalt: 0* comprenant un valeur de 0 par défault. (1 = Like | -1 = Dislike)
        * *default: []* comprenant le *string* de l'user ID. 

| **Ligne 17** : Exportation du schéma ``Sauce``.

User
----

.. code-block:: javascript
    :linenos:

    const mongoose = require('mongoose');
    const uniqueValidator = require('mongoose-unique-validator');

    const userSchema = mongoose.Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    });

    userSchema.plugin(uniqueValidator);

    module.exports = mongoose.model('User', userSchema);

| **Ligne 1 à 2 :** Importation de **mongoose** et du plugin **mongoose-unique-validator**.

| **Ligne 4 à 7 :** Création du schéma de données ``User``.

* Utilisation de la fonction ``Schema`` fourni par **Mongoose**.
* Déclaration de l'objet ``userSchema`` qui comporte différents champs : 

    #. Une clée, contenant le nom des objets.
    #. Son type (String, number, etc...)
    #. Son parametre requis. Ici, *true* pour rendre obligatoire chaques champs.

| **Ligne 4** : Dans notre **schéma utilisateur** la valeur ``unique``, avec l'élément ``mongoose-unique-validator`` passé comme *plug-in*, s'assurera que deux utilisateurs ne puissent partager la même adresse e-mail.

| **Ligne 9** : Appel de la fonction ``uniqueValidator`` fourni par **mongoose-unique-validator**.

| **Ligne 11** : Exportation du schéma ``User``.


:ref:`En savoir plus sur : mongoose-unique-validator <security_mongoose_unique_validator>`