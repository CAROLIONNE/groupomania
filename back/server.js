// Import express
const express = require("express");
const app = express();

// Permet d'accéder au corps de la requête
app.use(express.json());

// CORS
const cors = require('cors');
app.use(cors());

// // Routes
// const userRoutes = require('./routes/user');
// const postRoutes = require('./routes/post');


// app.use('/api/user', userRoutes);
// app.use('/api/post', postRoutes);




// import dotenv
require('dotenv').config();

// Connexion mysql
const mysql = require('mysql');
console.log('Get connection ...');

const conn = mysql.createConnection({
  database: process.env.database,
  host: process.env.host_sql,
  user: process.env.user_sql,
  password: process.env.password_sql
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de donnée");
});

const users = "SELECT * FROM utilisateur";

conn.query(users, function (err, result) {
    if (err) throw err;
    console.log(result);
});




conn.query("SELECT * FROM utilisateur WHERE id_user = 3 ", function (err, result) {
    
    if (err) throw err;
    console.log(result);
});

// Ecoute du serveur 
app.listen(8080, () => {
    console.log('Serveur OK !');
})