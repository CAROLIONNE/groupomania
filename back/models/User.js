const sequelize = require("../db");
const { Sequelize, Model, DataTypes } = require('sequelize');
//const sequelize = new Sequelize('mysql');
//const sequelize = new Sequelize("mysql::memory:");
// const sequelize = new Sequelize('groupomania', 'root', 'root', {
//     host: 'localhost',
//     dialect: 'mysql'
//   });
const bcrypt = require('bcrypt');

class Utilisateur extends Model {
    cryptPassword (req, res) {
        bcrypt
    // Cryptage du mot de passe 
    .hash(this.password, 10)
    // Creer nouvel utilisateur
    .then((hash) => {
       this.password = hash;
    })
    }
}
    

Utilisateur.init({
    id_user: {
    type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true,unique: true,
    allowNull: false,
    },
    mail: {
    type: DataTypes.STRING(75),
    allowNull: false,
    },
    role: {
    type: DataTypes.STRING(10),
    defaultValue: "simpleuser",
    allowNull: false,
    },
    MOT_PSW: {
    type: DataTypes.STRING(50),
    allowNull: false,
    },
    TEMP_PSW: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    },
    DAT_CREA: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
    },
    DAT_MDP: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
    },
    AVATAR: {
    type: DataTypes.STRING(75),
    defaultValue: "default.jpg",
    allowNull: false,
    },
    PSEUDONYME: {
    type: DataTypes.STRING(30),
    allowNull: false,
    },
    POSTE: {
    type: DataTypes.STRING(25),
    allowNull: true,
    },
    BUREAU: {
    type: DataTypes.STRING(15),
    allowNull: true,
    },
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Utilisateur', // We need to choose the model name    
    tableName: 'utilisateur'
});
/*
(async () => {
    //await sequelize.sync({ force: true });
    // Code here
  })();*/
//sequelize.models.utilisateur
console.log(Utilisateur === sequelize.models.Utilisateur);
const chaton = sequelize.models.Utilisateur.build ({ mail: "rk@mail.fr", mot_psw: "milky", pseudonyme: "chaton"});
console.log(chaton); 