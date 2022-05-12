const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        console.log("error authentification", err);
        res.status(401).json({ error: "Token invalid" });
      } else {
        const userId = decodedToken.id;
        const isAdmin = decodedToken.isAdmin;
        console.log("UserId : ", userId, "role : ", isAdmin);
        req.auth = { userId, isAdmin };
        if (req.body.userId && req.body.userId !== userId) {
          throw new Error("Invalid user ID");
        } else {
          next();
        }
      }
    });
  } catch (error) {
    console.log("bug", error)
    res.status(403).json({ error: "unauthorized request !" });
  }
};
