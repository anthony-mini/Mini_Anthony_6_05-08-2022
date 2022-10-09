Fichiers 
========

**app.js**
----------

Route POST : 
************

.. code-block:: javascript
  :emphasize-lines: 2,3,4,6

  app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
  });