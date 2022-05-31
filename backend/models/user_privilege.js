const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    privilege_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "privilege_id"
    },
    usr_pv_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "usr_pv_name"
    },
    usr_pv_description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "usr_pv_description"
    }
  };
  const options = {
    tableName: "user_privilege",
    comment: "",
    indexes: []
  };
  const UserPrivilegeModel = sequelize.define("user_privilege_model", attributes, options);
  return UserPrivilegeModel;
};