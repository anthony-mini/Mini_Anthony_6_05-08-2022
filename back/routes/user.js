/**
* Importation d'express
* 
* Utilisation de la methode Router(), d'express. 
* 
* Importation de la logique de routing pour les controleurs User.
*/

const express = require('express');

const router = express.Router();

const rateLimit = require('express-rate-limit')

const userCtrl = require('../controllers/user');

const createAccountLimiter = rateLimit({
	windowMs : 10 * 60 * 1000, // 10 minutes
	max : 2, // Limitez chaque IP à 2 création des demandes de compte par `fenêtre` (ici, par tranche de 10 minutes)
	message : 'Trop de comptes créés à partir de cette IP, veuillez réessayer dans 30 minutes',
	standardHeaders : true, // Informations sur la limite de taux de retour dans les en-têtes `RateLimit-*`
	legacyHeaders : false, // Désactiver les en-têtes `X-RateLimit-*`
});

router.post('/signup', createAccountLimiter, userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation de la methode routing. 
module.exports = router;