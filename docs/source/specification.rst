Spécification de l'API : 
========================

.. list-table:: 
   :widths: 25 25 25 25 50
   :header-rows: 1

   * - method
     - Point d'accès
     - Request body
     - Type de réponse attendue
     - Fonction
   * - POST
     - /api/auth/signup
     - { email: string, password: string}
     - { message: string}
     - Hachage du mot de passe de l'utilisateur, ajout de l'utilisateur à la abse de données.
   * - POST
     - /api/auth/login
     - { email: string, password: string }
     - {userId: string, token: string }
     - Vérification des informations d'identification de l'utilisateur, renvoi l_id de l'utilisateur depuis la base de données et un token web JSON signé (conteant également l'_id de l'utilisateur).
   * - GET
     - /api/sauces
     - -
     - Array of sauces
     - Renvoie la sauce avec l'_id fourni.
   * - GET
     - /api/sauces/:id
     - -
     - Single sauce
     - Renvoie la sauce avec l'_id fourni.
   * - POST
     - /api/sauces
     - { sauce: String, image: File }
     - {message: String} **Verb**
     - Capture et enregistre l'image, analyse la sauce transformée en chaîne de caractères et l'enregistre dans la base de données en définissant correctement son **imageUrl**. Initialise les likes et dislikes de la sauce à 0 et les usersDisliked avec des tableaux vides. Remarquez que le corps de la demande initiale est vide ; lorsque multer est ajouté, il renvoie une chaîne pour le corps de la demande en fonction des données soumises avec le fichier. 

