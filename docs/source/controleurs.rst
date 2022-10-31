Controleurs CRUD
================

.. note:: 
  Le dossier contenant les controllers contient la logique métier.


Sauce.js
--------

Création d'une sauce
^^^^^^^^^^^^^^^^^^^^

.. .. code-block:: javascript
..   :emphasize-lines: 2,3,4,6

* Utilisation de la méthode **post()**. 

* Création d'une nouvelle instance du modèle ``sauce``, en lui passant un objet JavaScript, contenant toute les informations du corps requête (*userId, name, manufacturer, description, etc...*). 

* Suppression du faux ``_id`` envoyé par l'application front-end, avec la méthode **delete**. 

* Enregistrement de l'objet, avec la methode **save**, dans notre base de donnée. 

* La méthode **save** renvoie une Promise qui nous permet de ne pas avoir une expiration de requête.

.. note:: 

  L'opérateur *spread* ``...`` est utilisé pour faire une copie de tous les éléments de req.body.
  Voir documentation MDN : `<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax>`_


Récupération des Sauces
^^^^^^^^^^^^^^^^^^^^^^^

.. note::

  Ici, l'on recherche à récupérer toutes la liste des sauces enregistrer dans la base de données

.. .. code-block:: javascript
..   :emphasize-lines: 2

* Utilisation de la méthode **get()**. 

* Ici nous utilisons la méthode **find()** afin de renvoyer un tableau contenant toutes les sauces présentes dans notre base de données. 

.. note::
  La base de données MongoDB est fractionnée en collections : le nom de la collection est défini par défaut sur le pluriel du nom du modèle. Ici, ce sera sauce**S**.


Récupération d'une Sauce spécifique
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: javascript
  :emphasize-lines: 1,2

  app.get('/api/sauces/:id', (req, res, next) => {
  sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
  });

* Utilisation de la méthode **get()**. 

* Utilisation de la méthode **findOne** dans notre modèle *sauce* pour trouver la sauce unique ayant le même ``_id`` que le paramètre de la requête. 

Modification d'une sauce 
^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: javascript
  :emphasize-lines: 1,2

  app.put('/api/sauces/:id', (req, res, next) => {
  sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
    .catch(error => res.status(400).json({ error }));
  });

* Utilisation de la méthode **put()**.
* Utilisation de la méthode **updateOne** pour mettre à jour la *sauce* correspondant à l'objet passé en permière argument. 

Suppression d'une sauce 
^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: javascript
  :emphasize-lines: 1,2

  app.delete('/api/sauces/:id', (req, res, next) => {
  sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
    .catch(error => res.status(400).json({ error }));
  });

User.js
-------

* Importation des packages :

.. code-block:: javascript

  const User = require('../models/User');

  require("dotenv").config();

  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');



* Exportation des fonctions de routing :

.. code-block:: javascript
  :linenos:

  exports.signup = (req, res, next) => {
      
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

      if (regex.test(req.body.password)) {
          
          bcrypt
          .hash(req.body.password, 10)
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
      } else {

          res.statusMessage = "Mots de passe de 8 caractères, comportant une majuscule et un chiffre minimum demandé.";

          res.status(403).json({ error: 'error' });
      }
  };

| **Ligne 1 :** Lorem

| **Ligne 2 :** Lorem

.. code-block:: javascript
  :linenos:

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
                              process.env.TOKEN_PASSWORD,
                              { expiresIn: '24h' }
                          )
                      });
                  })
                  .catch(error => res.status(500).json({ error }));
          })
          .catch(error => res.status(500).json({ error }));
  };

| **Ligne 1 :** Lorem

| **Ligne 2 :** Lorem



:ref:`Plus d'information sur la sécurité des utilisateurs <security_user>`