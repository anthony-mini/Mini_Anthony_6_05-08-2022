Tester l'application en local 
=============================

Prérequis
---------

Pour tester l'application en local, veuillez à installer les versions : 

* Node.js : 16.18.0 ou supérieur ;

* NPM : 8.19.2 ou supérieur. 

Installer les dépendances 
-------------------------

front-end
^^^^^^^^^

Dans le dosser ``cd/front``:

- Lancer la commande : 

.. code-block:: shell

    npm install

back-end
^^^^^^^^^

Dans le dosser ``cd/back``:

#. Ajouter le fichier ``.env`` fourni.
#. Ajouter une dossier ``images`` *vide*.
#. Lancer la commande : 

.. code-block:: shell

    npm install


Lancer les serveurs
-------------------

front-end
^^^^^^^^^

Dans le dosser ``cd/front``:

- Lancer la commande : 

.. code-block:: shell

    npm run start


back-end
^^^^^^^^^

Dans le dosser ``cd/back``:

- Lancer la commande : 

.. code-block:: shell

    nodemon server

.. tip:: 
    Une fois ces étapes terminées, vous pouvez tester l'application en cliquant sur le serveur local : http://localhost:4200/ ! 😁