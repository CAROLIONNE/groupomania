const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.id_user;
    console.log("-------", userId);
    if (req.body.id_user && req.body.id_user != userId) {
      throw 'Invalid user ID';
    } else {
      console.log(req);
      next();
    }
  } catch (err){
    console.log(err);
    res.status(401).json({err});
  }
};