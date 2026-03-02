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
    type: Datatypes.DATE,
    defaultValue: Datatypes.NOW,
  },
  ip_address: {
    type: Datatypes.STRING(100),
    allowNull: true,
  },
}, {
  timestamps: false,
});

formSubmissionsModel.belongsTo(formsModel, {
  foreignKey: "form_id",
});

formsModel.hasMany(formSubmissionsModel, {
  foreignKey: "form_id",
  as: "submissions",
  onDelete: "CASCADE",
});

module.exports = formSubmissionsModel;