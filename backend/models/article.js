// `id_art`, `designation`, `unite`, `quantite`, `prixUnitaire`, 
// `montant`, `quantitRealise`, `perReal`, `perNonReal`, `datedebut`, `dateFin` , `lot_id`, `iduser`
const {
    DataTypes
  } = require('sequelize');
  const sequelize = require('../utils/database');
  const Article = sequelize.define(
    'article',
    {

      id_art: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "id_art"
      },
      designation: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "designation"
      },
      unite: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "unite"
      },
      quantite: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "quantite"
      },
      prixUnitaire: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "prixUnitaire"
      },
      montant: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "montant"
      },
      // quantite realise 
      quantitRealise: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "quantitRealise"
      },
      perReal: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "perReal"
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
      
      per: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "per"
      },
      perRealiseCalc: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "perRealiseCalc"
      },
      perNonRealiseCalc: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "perNonRealiseCalc"
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
      dateFin: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "dateFin"
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
      lot_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "lot_id",
        references: {
          key: "lot_id",
          model: "lot"
        }
      },
    }, {
    
      freezeTableName: true,
      timestamps: false
    }
  );
  module.exports = Article;

  Article.hasMany(Lotstat);
  Lotstat.belongsTo(Article, { targetKey: 'id_art', foreignKey: 'id_art' });

  
  
  