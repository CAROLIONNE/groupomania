// Import express
const express = require("express");
const app = express();

// Permet d'accéder au corps de la requête
app.use(express.json());

// CORS
const cors = require('cors');
app.use(cors());

// // Routes
const userRoutes = require('./routes/user');
// const postRoutes = require('./routes/post');

try {
    app.use('/api/user', userRoutes);

} catch (error) {
    console.log(error);
}
// app.use('/api/post', postRoutes);
/*
const dataBase = require('./db');

const users = "SELECT * FROM utilisateur";

dataBase.query(users, function (err, result) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
});*/

// import dotenv
require('dotenv').config();


// Ecoute du serveur 
app.listen(8080, () => {
    console.log('Serveur OK !');
})