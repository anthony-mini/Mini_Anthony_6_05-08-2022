Middelware 
==========

auth.js
-------
.. link:
.. _middelware_auth:

.. code-block:: javascript
    :linenos:

    const jwt = require('jsonwebtoken');
    require("dotenv").config();
 
    module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_PASSWORD);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch(error) {
        res.status(401).json({ error });
        }
    };

| **Ligne 1 :** Importation de **JWT** pour vérifier l'authentification des données. 
| :ref:`En savoir + <_security_jwt>`

| **Ligne 2 :** Importation du fichier `dotenv` contenant la clée du Token. 

| **Ligne 4 à 17 :** Exportation du middleware, contenant la fonction d'authentification via un *Token*. 

multer-config.js
----------------
.. link:
.. _multer_config: 

.. code-block:: javascript
    :linenos:

    const multer = require('multer');

    const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
    };

    const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
    });

    module.exports = multer({storage: storage}).single('image');