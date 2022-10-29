Sécurité de l'API
=================
.. link:
.. _security_user:

Bcrypt :
--------
.. link:
.. _bcrypt:

.. note:: 

    Pour notre système d'authentification, nous utilisons le package **bcrypt** afin de chiffer les mots de passe utilisateur. 

| **bcrypt** est un algorithme unidirectionnel pour chiffrer et créer un *hash* des mots de passe utilisateur, que nous stockerons ensuite dans le document de la base de données relatif à chaque utilisateur.
| Lorsqu'un utilisateur tentera de se connecter, nous utiliserons **bcrypt** pour créer un *hash* avec le mot de passe entré, puis le comparerons au *hash* stocké dans la base de données.
| Le package **bcrypt** permet d'indiquer si les deux *hashs* ont été générés à l'aide d'un même mot de passe initial. 
| Il nous aidera donc à implémenter correctement le stockage et la vérification sécurisés des mots de passe.

Plus d'information sur **bcrypt** : `<https://www.npmjs.com/package/bcrypt>`_

Installation 
^^^^^^^^^^^^
* Pour pouvoir utiliser les methodes de chiffrement, le package de chiffrement **bcrypt** est à installer, avec la commande ``npm install bcrypt``. 
* Et importer dans notre contôleur : ``const bcrypt = require('bcrypt');``.


















