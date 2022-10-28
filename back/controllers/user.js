const User = require('../models/User');

require("dotenv").config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/**
* Exportation des fonctions de routing.
*/

exports.signup = (req, res, next) => {
    
    // Vérifier que le mot de passe est assez long et contient une majuscule + chiffre
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (regex.test(req.body.password)) {
        
        bcrypt
        .hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
            email: req.body.email,
            password: hash
            });
            user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    } else {

        res.statusMessage = "Mots de passe de 8 caractères, comportant une majuscule et un chiffre minimum demandé.";

        res.status(403).json({ error: 'error' });
    }
};

exports.login = (req, res, next) => { 

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN_PASSWORD,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};