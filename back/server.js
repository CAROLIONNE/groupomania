// Import express
const express = require("express");
const app = express();

// Permet d'accéder au corps de la requête
app.use(express.json());

// CORS
const cors = require("cors");
app.use(cors());

// // Routes
const userRoutes = require("./routes/user");
// const commentRoutes = require('./routes/comment');
// const articleRoutes = require('./routes/article');

app.use("/api/user", userRoutes);
// app.use('/api/comment', commentRoutes);
// app.use('/api/article', articleRoutes);

// import dotenv
require("dotenv").config();

// Ecoute du serveur
app.listen(8080, () => {
  console.log("Serveur écoute !");
});
