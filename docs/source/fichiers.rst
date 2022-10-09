Fichiers 
========

**app.js**
----------

Enregistrement des Sauces dans la base données : 
************************************************

.. code-block:: javascript
  :emphasize-lines: 2,3,4,6

  app.post('/api/sauces', (req, res, next) => {
  delete req.body._id;
  const sauce = new sauce({
    ...req.body
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
    .catch(error => res.status(400).json({ error }));
  });


* Création d'une nouvelle instance du modèle ``sauce``, en lui passant un objet JavaScript, contenant toute les informations du corps requête (*userId, name, manufacturer, description, etc...*). 

* Suppression du faux ``_id`` envoyé par l'application front-end, avec la méthode **delete**. 

* Enregistrement de l'objet, avec la methode **save**, dans notre base de donnée. 

* La méthode **save** renvoie une Promise qui nous permet de ne pas avoir une expiration de requête.

.. note:: 

  L'opérateur *spread* ``...`` est utilisé pour faire une copie de tous les éléments de req.body.
  Voir documentation MDN : `<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax>`_

Récupération des Sauces dans la base données : 
**********************************************

.. code-block:: javascript
  :emphasize-lines: 2

  app.use('/api/sauces', (req, res, next) => {
  sauce.find()
    .then(things => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
  });

* Ici nous utilisons la méthode **find()** afin de renvoyer un tableau contenant toutes les sauces présentes dans notre base de données. 

.. note::
  La base de données MongoDB est fractionnée en collections : le nom de la collection est défini par défaut sur le pluriel du nom du modèle. Ici, ce sera ``sauce**s**``.