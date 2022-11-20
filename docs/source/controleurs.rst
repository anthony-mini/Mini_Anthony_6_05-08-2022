Controleurs CRUD
================

.. note:: 
  Le dossier contenant les controllers contient la logique métier.


Sauce.js
--------

Création d'une sauce
^^^^^^^^^^^^^^^^^^^^

.. code-block:: javascript
  :linenos:

  exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject.userId;

    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,

        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    
    sauce.save()
        .then(() => res.status(201).json({
            message: 'Sauce enregistré !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
  };


| **Ligne 1 :** Exports de la méthode de routing *createSauce*, contenant la méthode **post()**. 

| **Ligne 3 à 4 :** Suppression du faux ``_id`` et l'``userID`` envoyé par l'application front-end, avec la méthode **delete**. 

| **Bloc, ligne 6 :** Création d'une nouvelle instance du modèle ``sauce``, en lui passant un objet JavaScript, contenant toute les informations du corps requête (*userId, name, manufacturer, description, etc...*). 

| **Bloc, ligne 14 :** Enregistrement de l'objet, avec la methode **save**, dans notre base de donnée. 
| La méthode **save** renvoie une Promise qui nous permet de ne pas avoir une expiration de requête.

.. note:: 

  L'opérateur *spread* ``...`` est utilisé pour faire une copie de tous les éléments de req.body.
  Voir documentation MDN : `<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax>`_


Récupération des Sauces
^^^^^^^^^^^^^^^^^^^^^^^

.. note::

  Récupération de toutes la liste des sauces enregistrer dans la base de données.

.. code-block:: javascript
  :linenos:

  exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
      (sauces) => {
          res.status(200).json(sauces);
      }
    ).catch(
      (error) => {
          res.status(400).json({
              error: error
          });
      }
    );
  };

| **Ligne 1 :** Exports de la méthode de routing *getAllSauces*, contenant la méthode **get()**. 

| **Ligne 2 :** Méthode **find()** afin de renvoyer un tableau contenant toutes les sauces présentes dans notre base de données. 

.. note::
  La base de données MongoDB est fractionnée en collections : le nom de la collection est défini par défaut sur le pluriel du nom du modèle. Ici, ce sera sauce**S**.


Récupération d'une Sauce spécifique
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: javascript
  :linenos:

  exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
      _id: req.params.id
  }).then(
      (sauce) => {
          res.status(200).json(sauce);
      }
  ).catch(
      (error) => {
          res.status(404).json({
              error: error
          });
      }
  );};

| **Ligne 1 :** Exportation de la méthode *getOneSauce*, contenant la méthode de routing : **get()**. 

| **Ligne 2 :** Utilisation de la méthode **findOne** dans notre modèle *Sauce* pour trouver la sauce unique ayant le même ``_id`` que le paramètre de la requête. 

Modification d'une sauce 
^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: javascript
  :linenos:

  exports.updateSauce = (req, res, next) => {
  const sauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  
  delete sauceObject._userId;
  Sauce.findOne({_id: req.params.id})
  .then((sauce) => {
    if (sauce.userId != req.auth.userId) {
      res.status(401).json({ message : 'Not authorized'});
    } else {
      Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
      .then(() => res.status(200).json({message : 'Sauce modifié!'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
  };

| **Ligne 1 :** exports de la méthode updateSauce, avec la méthode **put()**.
| **Ligne 1 :** Méthode **updateOne** pour mettre à jour la *sauce* correspondant à l'objet passé en permière argument. 

Suppression d'une sauce 
^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: javascript
  :linenos:

  exports.deleteSauce = (req, res, next) => {
    Sauce
      .findOne({ _id: req.params.id })
      .then((sauce) => {

        const filename = sauce.imageUrl.split("/images/")[1];

        fs.unlink(`images/${filename}`, () => {
          
            Sauce
            .deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Sauce supprimé !" }))
            .catch((error) => res.status(400).json({ error }));

        });
      })
      .catch((error) => res.status(500).json({ error }));
  };

Like et Dislike 
^^^^^^^^^^^^^^^

**Condition 1 : Like d'une sauce** 

.. code-block:: javascript
  :linenos:

  exports.likeStatusSauce = (req, res, next) => {

    // Condition 1 : L'utilisateur like la sauce
    if(req.body.like === 1) {

      Sauce.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: req.body.like++ },
          $push: { usersLiked: req.body.userId }
        }
      )
        .then((sauce) => res.status(200).json({ message: "Successfull like post" }))
        .catch((error) => res.status(400).json({ error }));
    }

| **Ligne 4 :** On verifie la valeur envoyer par le front-end.

| **Ligne 6 :** Utilisation de la *méthode* **Update** pour mettre à jour le modèle de schéma **Sauce**.

| **Ligne 9 :** ``$inc`` incrémentation de la valeur à **+ 1** de la clé ``Likes``.

| **Ligne 10 :** ``$push`` On enregistre l'id de l'utilisateur dans la clé ``usersLiked``

**Condition 2 : Dislike d'une sauce**

.. code-block:: javascript
  :linenos:

    // Condition 2 : L'utilisateur dislike la sauce
    else if(req.body.like === -1) {

      Sauce.updateOne(

        { _id:req.params.id },

        {
          $inc: { dislikes: req.body.like++ * -1 },
          $push: {usersDisliked: req.body.userId }
        }

      )
        .then((sauce) => res.status(200).json({ message : "Successfull dislike post"}))
        .catch((error) => res.status(400).json({ error }));
    }
  
| **Ligne 2 :** On verifie la valeur envoyer par le front-end.

| **Ligne 4 :** Utilisation de la *méthode* **Update** pour mettre à jour le modèle de schéma **Sauce**.

| **Ligne 8 :** ``$inc`` incrémentation de la valeur à **- 1** de la clé ``dislikes``.

| **Ligne 9 :** ``$push`` On enregistre l'id de l'utilisateur dans la clé ``usersDisliked``

**Condition 3 : L'utilisateur unlike une sauce**

.. code-block:: javascript
  :linenos:

  else { 

      Sauce.findOne({ _id: req.params.id })

        .then((sauce) => {

          if(sauce.usersLiked.includes(req.body.userId)) {

            Sauce.updateOne(

              { _id: req.params.id },

              { 
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId }
              }
            )

              .then((sauce) => res.status(200).json({ message: "Successfull unlike post" }))
              .catch((error) => res.status(400).json({ error }));

          }

| **Ligne 3 :** Utilisation de la méthode **findOne** pour vérifier l'id utilisateur et l'id enregistrer dans la valeur du schéma de modèle : **userslikes**.

| **Ligne 9 :** Utilisation de la *méthode* **Update** pour mettre à jour le modèle de schéma **Sauce**.

| **Ligne 14 :** ``$inc`` incrémentation de la valeur à **- 1** de la clé ``Likes``.

| **Ligne 15 :** ``$pull`` On retire l'id de l'utilisateur dans la clé ``usersLiked``

**Condition 4 : L'utilisateur unDislike une sauce**

.. code-block:: javascript
  :linenos:

  // Condition 4 : L'utilisateur undislike une sauce 
    else if(sauce.usersDisliked.includes(req.body.userId)) {

    Sauce.updateOne(

      { _id: req.params.id },

      { 
        $inc: { dislikes: -1 },
        $pull: { usersDisliked: req.body.userId }
      }

    )

      .then((sauce) => res.status(200).json({ message: "Successfull undislike post" }))
      .catch((error) => res.status(400).json({ error }));

    }

| **Ligne 4 :** Utilisation de la *méthode* **Update** pour mettre à jour le modèle de schéma **Sauce**.

| **Ligne 9 :** ``$inc`` incrémentation de la valeur à **- 1** de la clé ``dislikes``.

| **Ligne 10 :** ``$pull`` On retire l'id de l'utilisateur dans la clé ``usersDisliked``

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

.. | **Ligne 1 :** Lorem

.. | **Ligne 2 :** Lorem

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

.. | **Ligne 1 :** Lorem

.. | **Ligne 2 :** Lorem



:ref:`Plus d'information sur la sécurité des utilisateurs <security_user>`