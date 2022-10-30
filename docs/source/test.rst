Tester l'application en local 
=============================

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


Fonction de création de compte
******************************

* Pour pouvoir utiliser les methodes de chiffrement, le package de chiffrement **bcrypt** est à installer, avec la commande ``npm install bcrypt``. 
* Et importer dans notre contôleur : ``const bcrypt = require('bcrypt');``.

.. code-block:: javascript
    :emphasize-lines: 1,3,4,7

    const bcrypt = require('bcrypt');
    const User = require('../models/User');

    exports.signup = (req, res, next) => {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
            email: req.body.email,
            password: hash
            });
            user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    };

Tokens
------

* Pour pouvoir créer et vérifier les tokens d'authentification, il nous faudra un nouveau package : ``npm install jsonwebtoken```
* Et importer dans notre contôleur : ``const jwt = require('jsonwebtoken');``. 

.. note:: 
    Notre **token d'authentification** sera utiliser dans notre fonction **login**

.. code-block:: javascript
    :emphasize-lines: 2,4,6

    exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
       .then(user => {
           if (!user) {
               return res.status(401).json({ error: 'Utilisateur non trouvé !' });
           }
           bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                   if (!valid) {
                       return res.status(401).json({ error: 'Mot de passe incorrect !' });
                   }
                   res.status(200).json({
                       userId: user._id,
                       token: jwt.sign(
                           { userId: user._id },
                           'RANDOM_TOKEN_SECRET',
                           { expiresIn: '24h' }
                       )
                   });
               })
               .catch(error => res.status(500).json({ error }));
       })
       .catch(error => res.status(500).json({ error }));
    };