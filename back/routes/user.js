/**
* Importation d'express
* 
* Utilisation de la methode Router(), d'express. 
* 
* Importation de la logique de routing pour les controleurs User.
*/

const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation de la methode routing. 
module.exports = router;