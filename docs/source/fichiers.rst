Fichiers 
========

**app.js**
----------

Route POST : 
************

.. code-block:: javascript
  :emphasize-lines: 2,3,4,6

  app.post('/api/sauces', (req, res, next) => {
  delete req.body._id;
  const sauce = new sauce({
    ...req.body
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
  });


* Création d'une nouvelle instance du modèle ``sauce``, en lui passant un objet JavaScript, contenant toute les informations du corps requête (*userId, name, manufacturer, description, etc...*). 

* Suppression du faux ``_id`` envoyé par l'application front-end, avec la méthode **delete**. 

* Enregistrement de l'objet, avec la methode **save**, dans notre base de donnée. Retourne un promise pour ne pas avoir d'expiration de requête. 

.. note:: 

  L'opérateur *spread* ``...`` est utilisé pour faire une copie de tous les éléments de req.body.
  Voir documentation MDN : `<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax>`_
