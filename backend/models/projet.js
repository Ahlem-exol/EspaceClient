const {
    DataTypes
  } = require('sequelize');
  
  const sequelize = require('../utils/database');
const Lot = require('./lot');
 
  const Projet = sequelize.define(
    'projet',
    {
   
        prj_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "prj_id"
      },
      titre: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "titre"
      },
      duree: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "duree"
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
      localisation: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "localisation"
      },
      dateDemarage: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "dateDemarage"
      },
      dateFin: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "dateFin"
      },
      perRealise: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "perRealise"
      },
      perNonReal: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "perNonReal"
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
      
      montent: {
        type: DataTypes.REAL,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "montent"
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
          model: "societe"
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
  module.exports = Projet;

Projet.hasMany(Lot);
Lot.belongsTo(Projet, { targetKey: 'prj_id', foreignKey: 'prj_id' });


  
  
  
  