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

// Import dotenv variables d'environnement
require("dotenv").config();

// Limitation du nombre de requêtes
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


app.use(limiter)


// Ecoute du serveur
app.listen(3000, () => {
  console.log("Serveur écoute !");
});
