const Datatypes = require("sequelize").DataTypes;
const sequelize = require("../config/dbConfig");


const formsModel = require("./forms.model");

const formSubmissionsModel = sequelize.define("form_submissions", {
  id: {
    type: Datatypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  form_id: {
    type: Datatypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: Datatypes.STRING(100),
    allowNull: true,
  },
  created_at: {
    type: Datatypes.DATE(6),  // 👈 CAMBIADO: DATE(6) para datetimeoffset
    defaultValue: Datatypes.NOW,
  },
  ip_address: {
    type: Datatypes.STRING(100),
    allowNull: true,
  },
}, {
  timestamps: false,
});


module.exports = formSubmissionsModel;