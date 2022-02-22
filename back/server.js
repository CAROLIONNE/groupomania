// Import express
const express = require("express");
const app = express();

// Permet d'accéder au corps de la requête
app.use(express.json());

// CORS
const cors = require("cors");
app.use(cors());

const path = require('path');

// Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
const userRoutes = require("./routes/user");
const articleRoutes = require('./routes/article');
const commentRoutes = require('./routes/comment');

app.use("/api/user", userRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/comment', commentRoutes);

// import dotenv
require("dotenv").config();




// Ecoute du serveur
app.listen(8080, () => {
  console.log("Serveur écoute !");
});
