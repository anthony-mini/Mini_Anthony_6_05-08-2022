Sécurité de l'API
=================
.. link:
.. _security_user:

:ref:`Rappel des exigences de sécurité : <exigence_security>.`

Bcrypt 
------
.. link:
.. _bcrypt:

.. note:: 

    Pour notre **controleur d'authentification**, nous utilisons le package **Bcrypt** afin de chiffer les mots de passe utilisateur. 

| **Bcrypt** est un algorithme unidirectionnel pour chiffrer et créer un *hash* des mots de passe utilisateur, que nous stockerons ensuite dans le document de la base de données relatif à chaque utilisateur.
| Lorsqu'un utilisateur tentera de se connecter, nous utiliserons **Bcrypt** pour créer un *hash* avec le mot de passe entré, puis le comparerons au *hash* stocké dans la base de données.
| Le package **Bcrypt** permet d'indiquer si les deux *hashs* ont été générés à l'aide d'un même mot de passe initial. 
| Il nous aidera donc à implémenter correctement le stockage et la vérification sécurisés des mots de passe.

Plus d'information sur **Bcrypt** : `<https://www.npmjs.com/package/bcrypt>`_

Installation 
^^^^^^^^^^^^
* Pour pouvoir utiliser les methodes de chiffrement, le package de chiffrement **bcrypt** est à installer, avec la commande ``npm install bcrypt``. 
* Et importer dans notre contôleur : ``const bcrypt = require('bcrypt');``.


Helmet
------
.. link:
.. _helmet:

.. note:: 

    **Helmet** est configuré pour notre application *Express*, en important divers en-têtes HTTP pré-configurées, afin de sécurisé l'application contre certaine attaques. 

.. code:: javascript

    // Importation du package
    const helmet = require('helmet');

    app.use(
      helmet({
        crossOriginResourcePolicy: false, // Désactive la sécurité lors de la récupération des images.
        contentSecurityPolicy : false, // Désactive la sécurité lors des intéractions avec la modification de sauce.
      })
    );

Installation 
^^^^^^^^^^^^
* **Commande** ``npm install bcrypt``.

Plus d'information sur **Helmet** : `<https://www.npmjs.com/package/helmet>`_


Multer
------
.. link:
.. _security_multer:

.. note::
    **Multer** est le *middleware* chargé de gérer les fichiers entrant dans les requêtes HTTP de type **POST** et **PUT**, pour la création de sauce et la modification d'une sauce. 

:ref:`En savoir plus dans section Middlware/multer-config <multer_config>.`
   
Installation 
^^^^^^^^^^^^
* **Commande** ``npm install multer``.

Plus d'information sur **Multer** : `<https://www.npmjs.com/package/multer>`_




