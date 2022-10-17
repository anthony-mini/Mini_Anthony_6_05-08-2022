/**
* Importation d'express
* 
* Utilisation des middleware et de la methode Router(), d'express. 
* 
* Importation de la logique de Routing pour les controleurs Sauce. 
*/

const express = require('express');
const sauceCtrl = require('../controllers/sauce');


const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config');

//GET
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);

//POST
router.post('/', auth, multer, sauceCtrl.createSauce);
router.post('/:id/like', auth, sauceCtrl.likeStatusSauce);

//PUT
router.put('/:id', auth, multer, sauceCtrl.updateSauce);

//DELETE
router.delete('/:id', auth, sauceCtrl.deleteSauce);


// Exportation de la methode router. 
module.exports = router;