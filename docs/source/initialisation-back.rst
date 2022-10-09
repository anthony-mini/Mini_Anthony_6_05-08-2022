Installation des dépendances
============================

Démarrer le serveur Node
------------------------

Package nodemon :
******************

À partir du dossier front ``cd/back``, installer l'outil de developpement **nodemon** : 

.. code-block:: shell

    npm install -g nodemon
    nodemon server

Accédez à `<http://localhost:3000>`_, pour accéder à l'interface. 

.. note::
    Nodemon est un package qui mettra à jour votre serveur démarré à chaque changement de fichier, vous facilitant le développement Node.


Installation de l'application : **Express**
-------------------------------------------

#. Dans le dossier ``cd/back``, installer le package avec la commande ``npm install express --save``.

#. Le fichier **app.js** est utilisé pour la gestion de l'application *Express*.

Base de données **MongoDB** : 
-----------------------------

* Installation du package **Mongoose** avec la commande ``npm install mongoose``.

.. note:: 

    Mongoose est un package qui facilite les interactions avec notre base de données MongoDB. Il nous permet de :

* Valider le format des données ;

* Gérer les relations entre les documents ;

* Communiquer directement avec la base de données pour la lecture et l'écriture des documents.

.. note::
    Accéder à la base de donnée *MongoDB*, en vous connectant avec votre identifiant à l'adresse suivante : `<https://www.mongodb.com/atlas/database>`_.
