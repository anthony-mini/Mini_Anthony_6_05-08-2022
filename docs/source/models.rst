Schema de modele
================

Sauces
------

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

| **Ligne 11** : Exportation du schéma ``User``


:ref:`En savoir plus sur : mongoose-unique-validator <security_mongoose_unique_validator>`