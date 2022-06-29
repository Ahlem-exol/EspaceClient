const {
    DataTypes
  } = require('sequelize');
  
  const sequelize = require('../utils/database');
 
  const Lotstat = sequelize.define(
    'lotstat',
    {

        idStat: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "idStat"
      },
      dateUpdate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "dateUpdate"
      },
      
      Percentage: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "Percentage"
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
  module.exports = Lotstat;

  
  
  
  