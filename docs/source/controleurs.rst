Controleurs CRUD
================

Création et lecture des données
-------------------------------

Enregistrement des Sauces dans la base données
**********************************************

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


* Utilisation de la méthode **post()**. 

* Création d'une nouvelle instance du modèle ``sauce``, en lui passant un objet JavaScript, contenant toute les informations du corps requête (*userId, name, manufacturer, description, etc...*). 

* Suppression du faux ``_id`` envoyé par l'application front-end, avec la méthode **delete**. 

* Enregistrement de l'objet, avec la methode **save**, dans notre base de donnée. 

* La méthode **save** renvoie une Promise qui nous permet de ne pas avoir une expiration de requête.

.. note:: 

  L'opérateur *spread* ``...`` est utilisé pour faire une copie de tous les éléments de req.body.
  Voir documentation MDN : `<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax>`_


Récupération des Sauces
***********************

.. note::

  Ici, l'on recherche à récupérer toutes la liste des sauces enregistrer dans la base de données

.. code-block:: javascript
  :emphasize-lines: 2

  app.get('/api/sauces', (req, res, next) => {
  sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
  });

* Utilisation de la méthode **get()**. 

* Ici nous utilisons la méthode **find()** afin de renvoyer un tableau contenant toutes les sauces présentes dans notre base de données. 

.. note::
  La base de données MongoDB est fractionnée en collections : le nom de la collection est défini par défaut sur le pluriel du nom du modèle. Ici, ce sera sauce**S**.


Récupération d'une Sauce spécifique
***********************************

.. code-block:: javascript
  :emphasize-lines: 1,2

  app.get('/api/sauces/:id', (req, res, next) => {
  sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
  });

* Utilisation de la méthode **get()**. 

* Utilisation de la méthode **findOne** dans notre modèle *sauce* pour trouver la sauce unique ayant le même ``_id`` que le paramètre de la requête. 

Modification et suppression des données
---------------------------------------

Modification d'une sauce 
************************

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
***********************

.. code-block:: javascript
  :emphasize-lines: 1,2

  app.delete('/api/sauces/:id', (req, res, next) => {
  sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
    .catch(error => res.status(400).json({ error }));
  });