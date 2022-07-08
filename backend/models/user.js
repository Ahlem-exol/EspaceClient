const {
  DataTypes
} = require('sequelize');

const sequelize = require('../utils/database');
const Contact = require('./contact');
const Lot = require('./lot');
const Lotstat = require('./lotstat');
const Projet = require('./projet');
const Societe = require('./societe');
const Article = require('./article');

const User = sequelize.define(
  'user',
  {
   
    usr_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "usr_id"
    },
    usr_nom: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "usr_nom"
    },
    usr_prenom: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "usr_prenom"
    },
    usr_mobile: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "usr_mobile"
    },
    usr_fonction: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "usr_fonction"
    },
    usr_address: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "usr_address"
    },
    usr_active: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "usr_active"
    },
    usr_date_inscription: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "usr_date_inscription"
    },
    usr_email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "usr_email"
    },
    usr_password: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "usr_password"
    },
    privilege_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "privilege_id",
      references: {
        key: "privilege_id",
        model: "user_privilege_model"
      }
    },
    societe_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "societe_id",
      references: {
        key: "societe_id",
        model: "societe_model"
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
module.exports = User;

User.hasMany(Societe);
Societe.belongsTo(User, { targetKey: 'usr_id', foreignKey: 'usr_id' });

User.hasMany(Contact);
Contact.belongsTo(User, { targetKey: 'usr_id', foreignKey: 'usr_id' });

User.hasMany(Projet);
Projet.belongsTo(User, { targetKey: 'usr_id', foreignKey: 'usr_id' });

User.hasMany(Lot);
Lot.belongsTo(User, { targetKey: 'usr_id', foreignKey: 'usr_id' });

User.hasMany(Lotstat);
Lotstat.belongsTo(User, { targetKey: 'usr_id', foreignKey: 'usr_id' });

User.hasMany(Article);
Article.belongsTo(User, { targetKey: 'usr_id', foreignKey: 'usr_id' });

