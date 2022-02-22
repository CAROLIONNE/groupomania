const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  try {
    // Recuperer le token dans l'en-tête authorisation de la requete
    const token = req.headers.authorization.split(' ')[1];
    // Decoder le token
    const decodedToken = jwt.verify(token, process.env.SECRET);
    // Verification de l'ID
    const id_user = decodedToken.id_user;
    if (req.body.id_user && req.body.userId !== id_user) {
      // Remonter l'erreur
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};