const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
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
    }
  };
  const options = {
    tableName: "user",
    comment: "",
    indexes: [{
      name: "privilege_id",
      unique: false,
      type: "BTREE",
      fields: ["privilege_id"]
    }, {
      name: "societe_id",
      unique: false,
      type: "BTREE",
      fields: ["societe_id"]
    }]
  };
  const UserModel = sequelize.define("user_model", attributes, options);
  return UserModel;
};