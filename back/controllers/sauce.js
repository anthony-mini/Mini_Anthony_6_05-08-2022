// Importer le modèle sauce
const Sauce = require('../models/Sauce');
// importer filesystem
const fs = require('fs');

// Créer une sauce

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject.userId;

    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,

        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    
    sauce.save()
        .then(() => res.status(201).json({
            message: 'Sauce enregistré !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

// Récupérer toutes les sauces

exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
      (sauces) => {
          res.status(200).json(sauces);
      }
  ).catch(
      (error) => {
          res.status(400).json({
              error: error
          });
      }
  );
};

// Récupérer une sauce spécifique

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
      _id: req.params.id
  }).then(
      (sauce) => {
          res.status(200).json(sauce);
      }
  ).catch(
      (error) => {
          res.status(404).json({
              error: error
          });
      }
  );
};

//Modifier une sauce existante

exports.updateSauce = (req, res, next) => {
  const sauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  
  delete sauceObject._userId;
  Sauce.findOne({_id: req.params.id})
  .then((sauce) => {
    if (sauce.userId != req.auth.userId) {
      res.status(401).json({ message : 'Not authorized'});
    } else {
      Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
      .then(() => res.status(200).json({message : 'Sauce modifié!'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

// Supprimer un sauce 

exports.deleteSauce = (req, res, next) => {
    Sauce
      .findOne({ _id: req.params.id })
      .then((sauce) => {

        const filename = sauce.imageUrl.split("/images/")[1];

        fs.unlink(`images/${filename}`, () => {
          
            Sauce
            .deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Sauce supprimé !" }))
            .catch((error) => res.status(400).json({ error }));

        });
      })
      .catch((error) => res.status(500).json({ error }));
};

// Like et dislike
     
exports.likeStatusSauce = (req, res, next) => {

    // Condition 1 : L'utilisateur like la sauce
    if(req.body.like === 1) {

      Sauce.updateOne(

        { _id: req.params.id },

        {
          $inc: { likes: req.body.like++ },
          $push: { usersLiked: req.body.userId }
        }
      )

        .then((sauce) => res.status(200).json({ message: "Successfull like post" }))
        .catch((error) => res.status(400).json({ error }));
    }

    // Condition 2 : L'utilisateur dislike la sauce
    else if(req.body.like === -1) {

      Sauce.updateOne(

        { _id:req.params.id },

        {
          $inc: { dislikes: req.body.like++ * -1 },
          $push: {usersDisliked: req.body.userId }
        }

      )

        .then((sauce) => res.status(200).json({ message : "Successfull dislike post"}))
        .catch((error) => res.status(400).json({ error }));

    }
    // Condition 3 : L'utilisateur unlike une sauce 
    else { 

      Sauce.findOne({ _id: req.params.id })

        .then((sauce) => {

          if(sauce.usersLiked.includes(req.body.userId)) {

            Sauce.updateOne(

              { _id: req.params.id },

              { 
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId }
              }
            )

              .then((sauce) => res.status(200).json({ message: "Successfull unlike post" }))
              .catch((error) => res.status(400).json({ error }));

          }
          // Condition 4 : L'utilisateur undislike une sauce 
          else if(sauce.usersDisliked.includes(req.body.userId)) {

            Sauce.updateOne(

              { _id: req.params.id },

              { 
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId }
              }

            )

              .then((sauce) => res.status(200).json({ message: "Successfull undislike post" }))
              .catch((error) => res.status(400).json({ error }));

          }
        })

        .catch((error) => res.status(400).json({ error }));
    }
  };

  