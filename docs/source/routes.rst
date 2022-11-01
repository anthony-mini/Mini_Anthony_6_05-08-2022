Routes
======

.. note:: 
    Le dossier routes contient la logique de routing. 

User.js
-------

Importation des modules externes : 

    * Application Express
    * Méthode **Router()** d'express
    * Importation du module **express-rate-limit**
    * Importation du controleurs *user*.

.. code-block:: javascript
  :linenos:

    const express = require('express');

    const router = express.Router();

    const rateLimit = require('express-rate-limit')

    const userCtrl = require('../controllers/user');

Configuration de la fonction **rateLimit**

| Utilisateur sur la même adresse IP, limité à 5 création de compte sur une tranche de 30 minutes

.. code-block:: javascript
  :linenos:

  const createAccountLimiter = rateLimit({
	windowMs : 30 * 60 * 1000,
	max : 5,
	message : 'Trop de comptes créés à partir de cette IP, veuillez réessayer dans 30 minutes',
	standardHeaders : true,
	legacyHeaders : false,
    });

Configuration des méthodes de routing pour : 

    * La fonction de création de compte
    * La fonction de connexion au compte utilisateur

.. code-block:: javascript
  :linenos:

  router.post('/signup', createAccountLimiter, userCtrl.signup);
  router.post('/login', userCtrl.login);

  module.exports = router;

Sauces.js
---------
Importation des modules externes : 

    * Application Express.
    * Importation du controleurs *sauce*.
    * Importation du middleware d'**authentification**.
    * Méthode **Router()** d'express.
    * Importation du module **multer-config**.

.. code-block:: javascript
  :linenos:

    const express = require('express');
    const sauceCtrl = require('../controllers/sauce');


    const auth = require('../middleware/auth');
    const router = express.Router();
    const multer = require('../middleware/multer-config');

Configuration des méthodes de routing : 

    * Route **GET** pour les fonctions : 
        * De récupération des sauces. 
        * De récupération de sauce spécifique.
    
    * Route **POST** pour les fonctions : 
        * De création de sauce.
        * De like d'une sauce. 
    
    * Route **PUT** pour la fonction : 
        * De modification d'une sauce spécifique, créer par le même utilisateur. 
    
    * Route **DELETE** pour la fonction : 
        * De supression d'une sauce spécifique, créer par le même utilisateur.

.. code-block:: javascript
  :linenos:

    //GET
    router.get('/', auth, sauceCtrl.getAllSauces);
    router.get('/:id', auth, sauceCtrl.getOneSauce);

    //POST
    router.post('/', auth, multer, sauceCtrl.createSauce);
    router.post('/:id/like', auth, sauceCtrl.likeStatusSauce);

    //PUT
    router.put('/:id', auth, multer, sauceCtrl.updateSauce);

    //DELETE
    router.delete('/:id', auth, sauceCtrl.deleteSauce);


    // Exportation de la methode router. 
    module.exports = router;