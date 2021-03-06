const {
    DataTypes
  } = require('sequelize');
  
  const sequelize = require('../utils/database');
const Article = require('./article');
 
  const Lot = sequelize.define(
    'lot',
    {

      lot_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "lot_id"
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
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "description"
      },
      etat: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "etat"
      },
      duree: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "duree"
      },
      percentage: {
        type: DataTypes.REAL,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "percentage"
      },
      percentageRealise: {
        type: DataTypes.REAL,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "percentageRealise"
      },
      percentageNonRealise: {
        type: DataTypes.REAL,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "percentageNonRealise"
      },
      percentageRealiseCalcule: {
        type: DataTypes.REAL,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "percentageRealiseCalcule"
      },
      percentageNonRealiseCalcule: {
        type: DataTypes.REAL,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "percentageNonRealiseCalcule"
      },
      duree: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "duree"
      },
      dateFinLot: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "dateFinLot"
      },     
      datedebut: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "datedebut"
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
      montentLot: {
        type: DataTypes.REAL,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "montentLot"
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
      prj_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "prj_id",
        references: {
          key: "prj_id",
          model: "projet"
        }
      },
    }, {
    
      freezeTableName: true,
      timestamps: false
    }
  );
  module.exports = Lot;

  Lot.hasMany(Article);
  Article.belongsTo(Lot, { targetKey: 'lot_id', foreignKey: 'lot_id' });

  
  
  