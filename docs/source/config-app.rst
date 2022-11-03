Configuration de l'application
==============================

Importation des packages et modules externe 
-------------------------------------------

.. code-block:: javascript
  :linenos:

    const express = require('express');
    require("dotenv").config();
    const mongoose = require('mongoose');

    const path = require('path');
    const helmet = require('helmet');
    const rateLimit = require('express-rate-limit')

    const sauceRoutes = require('./routes/sauce');
    const userRoutes = require('./routes/user');
    const app = express();

| **Ligne 4 :** Lorem.

Connexion à la base de données 
------------------------------

.. code-block:: javascript
  :linenos:

    mongoose.connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_NAME}/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
 

| **Ligne 4 :** Lorem.

Sécurité de l'application
-------------------------

Express : RateLimte 
^^^^^^^^^^^^^^^^^^^

.. code-block:: javascript
  :linenos:

    const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 300, // Limitez chaque IP à 300 demandes par `fenêtre` (ici, par 10 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });

    app.use(limiter);

| **Ligne 4 :** Lorem.


Helmet 
^^^^^^

.. code-block:: javascript
  :linenos:

  app.use(
    helmet({
        crossOriginResourcePolicy: false, // Désactive la sécurité lors de la récupération des images.
        contentSecurityPolicy : false, // Désactive la sécurité lors de l'intération avec la modification des sauces.
    })
  );

| **Ligne 4 :** Lorem.

Configuration CORS 
------------------

.. code-block:: javascript
  :linenos:

  app.use((req, res, next) => {

    // Acces à l'API selon n'importe quel origine ('*')
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    // Ajout des headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
    // Envoie des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
  
    next();
  });

| **Ligne 4 :** Lorem.

Méthode de routing de l'application
-----------------------------------

.. code-block:: javascript
  :linenos:

  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/sauces', sauceRoutes);
  app.use('/api/auth', userRoutes);

| **Ligne 4 :** Lorem.