/**
* Importation d'express
* 
* Utilisation de la methode Router(), d'express. 
* 
* Importation du controller de sauce
*/

const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// const sauceCtrl = require('../controllers/sauce');

router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.updateSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
// router.post('/:id/like', auth, sauceCtrl.likeStatusSauce);


// Exportation de la methode router. 
module.exports = router;