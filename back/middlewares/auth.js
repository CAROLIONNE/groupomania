const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: "token expired" });
      } else {
        const userId = decodedToken.id_user;
        const role = decodedToken.role;
        console.log("UserId : ", userId, 'role : ', role);
        req.auth = { userId, role};
        if (req.body.userId && req.body.userId !== userId) {
          throw new Error("Invalid user ID");
        } else {

          next();
        }
      }
    });
  } catch (error) {
    res.status(403).json({ error: "unauthorized request !" });
  }
};
