Sécurité de l'API :
===================

Authentification :
------------------

.. note:: 

    Pour notre système d'authentification, nous utilisons le package **bcrypt**. 
    **bcrypt** est un algorithme unidirectionnel pour chiffrer et créer un *hash* des mots de passe utilisateur, que nous stockerons ensuite dans le document de la base de données relatif à chaque utilisateur.
    Lorsqu'un utilisateur tentera de se connecter, nous utiliserons **bcrypt** pour créer un *hash* avec le mot de passe entré, puis le comparerons au *hash* stocké dans la base de données.
    Le package **bcrypt** permet d'indiquer si les deux *hashs* ont été générés à l'aide d'un même mot de passe initial. 
    Il nous aidera donc à implémenter correctement le stockage et la vérification sécurisés des mots de passe.


* Installation du *plugin* : **uniqueValidator** present avec **mongoose**, dans le dossier back ``npm install mongoose-unique-validator``. 
    

Schéma utilisateur :
********************

.. code-block:: javascript
    :emphasize-lines: 2,4,6

    const mongoose = require('mongoose');
    const uniqueValidator = require('mongoose-unique-validator');

    const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    });

    userSchema.plugin(uniqueValidator);

    module.exports = mongoose.model('User', userSchema);

.. note:: 
    Dans notre schéma, la valeur ``unique``, avec l'élément ``mongoose-unique-validator`` passé comme *plug-in*, s'assurera que deux utilisateurs ne puissent partager la même adresse e-mail.


Routes d'authentification
*************************

* Installation du package de chiffrement ``bcrypt``avec la commande ``npm install bcrypt``. 