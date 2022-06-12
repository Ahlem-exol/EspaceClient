const {
  DataTypes
} = require('sequelize');

const sequelize = require('../utils/database');
const Contact = require('./contact');
const Projet = require('./projet');
const Societe = sequelize.define(
  'societe',
  {
      societe_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "societe_id"
    },
    raison_social: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "raison_social"
    },
    adresse: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "adresse"
    },
    mail: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mail"
    },
    telephone: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "telephone"
    },
    
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "description"
    },
    active: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "active"
    },
    fix: {
      type: DataTypes.STRING(250),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "fix"
    },
   
   
    usr_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "usr_id",
      references: {
        key: "usr_id",
        model: "user"
      }
    },
  }, {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    timestamps: false
  }
);
module.exports = Societe;


Societe.hasMany(Contact);
Contact.belongsTo(Societe, { targetKey: 'societe_id', foreignKey: 'societe_id' });

Societe.hasMany(Projet);
Projet.belongsTo(Societe, { targetKey: 'societe_id', foreignKey: 'societe_id' });





// const {
//   DataTypes
// } = require('sequelize');

// module.exports = sequelize => {
//   const attributes = {
//     societe_id: {
//       type: DataTypes.INTEGER(11),
//       allowNull: false,
//       defaultValue: null,
//       primaryKey: true,
//       autoIncrement: true,
//       comment: null,
//       field: "societe_id"
//     },
//     raison_social: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//       defaultValue: null,
//       primaryKey: false,
//       autoIncrement: false,
//       comment: null,
//       field: "raison_social"
//     },
//     adresse: {
//       type: DataTypes.STRING(250),
//       allowNull: false,
//       defaultValue: null,
//       primaryKey: false,
//       autoIncrement: false,
//       comment: null,
//       field: "adresse"
//     },
//     mail: {
//       type: DataTypes.STRING(250),
//       allowNull: false,
//       defaultValue: null,
//       primaryKey: false,
//       autoIncrement: false,
//       comment: null,
//       field: "mail"
//     },
//     telephone: {
//       type: DataTypes.STRING(250),
//       allowNull: false,
//       defaultValue: null,
//       primaryKey: false,
//       autoIncrement: false,
//       comment: null,
//       field: "telephone"
//     },
//     nif: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       defaultValue: null,
//       primaryKey: false,
//       autoIncrement: false,
//       comment: null,
//       field: "nif"
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       defaultValue: null,
//       primaryKey: false,
//       autoIncrement: false,
//       comment: null,
//       field: "description"
//     },
//     active: {
//       type: DataTypes.INTEGER(11),
//       allowNull: false,
//       defaultValue: null,
//       primaryKey: false,
//       autoIncrement: false,
//       comment: null,
//       field: "active"
//     },
//     date_create: {
//       type: DataTypes.DATEONLY,
//       allowNull: false,
//       defaultValue: null,
//       primaryKey: false,
//       autoIncrement: false,
//       comment: null,
//       field: "date_create"
//     },
//     nis: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       defaultValue: null,
//       primaryKey: false,
//       autoIncrement: false,
//       comment: null,
//       field: "nis"
//     },
//     rib: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       defaultValue: null,
//       primaryKey: false,
//       autoIncrement: false,
//       comment: null,
//       field: "rib"
//     },
//     banque: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       defaultValue: null,
//       primaryKey: false,
//       autoIncrement: false,
//       comment: null,
//       field: "banque"
//     }
//   };
//   const options = {
//     tableName: "societe",
//     comment: "",
//     indexes: []
//   };
//   const SocieteModel = sequelize.define("societe_model", attributes, options);
//   return SocieteModel;
// };