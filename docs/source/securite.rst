Sécurité de l'API
=================
.. link:
.. _security_user:

.. warning::

    :ref:`Rappel des exigences de sécurité <exigence_security>`

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

:ref:`En savoir plus dans section Middlware/multer-config <multer_config>`.
   
Installation 
^^^^^^^^^^^^
* **Commande** ``npm install multer``.

Plus d'information sur **Multer** : `<https://www.npmjs.com/package/multer>`_


JSON-web-token
--------------
.. link:
.. _security_jwt:

| **JSON-web-token** est un package de *Node.Js* permettant de créer des données (token) avec une signature. 
| Les jetons (tokens) sont signés à l'aide d'une clé privée. 
| Cette sécurité permet la vérification de l'intégrité et de l'authenticité des données.

:ref:`Voir l'utilisation de JSWT dans le middelware : auth.js <middelware_auth>`

| L’authentification forte par jeton s’appuie sur un protocole qui permet à un utilisateur de recevoir un jeton d’accès unique après avoir confirmé son identité. 
| L’utilisateur bénéficie alors, pendant toute la durée de vie du jeton, d’un accès à l’application ou au site web pour lequel le jeton lui a été accordé. 
| Il n’a ainsi plus besoin de saisir ses identifiants à chaque fois qu’il ouvre la même page web.
| Les jetons d’authentification fonctionnent à la manière d’un ticket d’entrée à validité limitée : ils accordent un accès en continu pendant leur durée de validité. 
| Dès que l’utilisateur se déconnecte ou quitte l’application, le jeton est invalidé.


Mongoose
--------
Mongoose est une bibliothèque de programmation orientée objet JavaScript qui crée une connexion entre MongoDB et l'environnement d'exécution JavaScript Node.js.

mongoose-unique-validator
^^^^^^^^^^^^^^^^^^^^^^^^^

:ref:`Voir l'utilisation de moongose-unique-validator, dans notre schema de donnée utilisateurs. <mongoose_unique_validator>`

.. link:
.. _security_mongoose_unique_validator:

Correctifs de versions
----------------------

**npm audit**

Vérification des versions packages installer pour le développement de notre projet.

| Si des vulnérabilités sont détecter, il faut mettre à jour les dépendances 

Dotenv
------

**Dotenv** est un module utilisé pour accéder aux *variables d'environnement* de notre application. 

| À l'exécution de notre application *NodeJS*, la variable globale ``process.env.``, injectent les informatons relatives aux : 
| - token,
| - Nom et mots de passe utilisateur de la base de donnée,
| - etc, ...
| Le fichier ``.env`` de notre code, contient toute nos variables d'environnement.

.. note::
    Notre fichier ``.env`` doit être ignoré de tout commit *git*. 
    Nos variables d'environnement seront donc stocké en local et ignoré dans notre fichier **.gitignore** à la racine de notre projet. 

Express-Rate-Limit
------------------

Middleware d'Express, utilisé pour limité le nombre de requête répétés pour une API.

1er Cas : 
^^^^^^^^^

Dans ce cas précis, **express-rate-limit** est utilisé pour limité le nombre de requête à 300, toute les 10 minutes.

.. code:: javascript

    const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 300, // Limitez chaque IP à 300 demandes par `fenêtre` (ici, par 10 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });

2nd Cas : 
^^^^^^^^^

Dans ce cas précis, **express-rate-limit** est utilisé pour limité le nombre de création de compte à 5, sur une durée de 30 minutes.

.. code:: javascript

    const createAccountLimiter = rateLimit({
	windowMs : 30 * 60 * 1000, // 30 minutes
	max : 5, // Limitez chaque IP à 5 création des demandes de compte par `fenêtre` (ici, par tranche de 30 minutes)
	message : 'Trop de comptes créés à partir de cette IP, veuillez réessayer dans 30 minutes',
	standardHeaders : true, // Informations sur la limite de taux de retour dans les en-têtes `RateLimit-*`
	legacyHeaders : false, // Désactiver les en-têtes `X-RateLimit-*`
    });