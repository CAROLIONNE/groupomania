const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql');

// const User = sequelize.define('User', {
//   // Model attributes are defined here
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING
//     // allowNull defaults to true
//   }
// }, {
//   // Other model options go here
// });

// // `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

exports.utilisateur = (sequelize, DataTypes,) => {
    try {
    const Utilisateur = sequelize.define("Utilisateur", {
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
        allowNull: false,
      },
      MOT_PSW: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      TEMP_PSW: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      DAT_CREA: {
        type: DataTypes.DATETIME,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      DAT_MDP: {
        type: DataTypes.DATETIME,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      AVATAR: {
        type: DataTypes.STRING(75),
        allowNull: false,
      },
      PSEUDONYME: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      POSTE: {
        type: DataTypes.STRING(25),
      },
      BUREAU: {
        type: DataTypes.STRING(15),
      },
    });
    return utilisateur;
} catch (error) {
    console.log('Unable to connect to the database:', error);
    }
};

console.log(Utilisateur === sequelize.models.Utilisateur);