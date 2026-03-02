const Datatypes = require("sequelize").DataTypes;
const sequelize = require("../config/dbConfig");

const formSubmissionsModel = require("./form_submissions.model");
const formFieldsModel = require("./form_fields.model");

const formSubmissionValuesModel = sequelize.define("form_submission_values", {
  id: {
    type: Datatypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  submission_id: {
    type: Datatypes.INTEGER,
    allowNull: false,
  },
  field_id: {
    type: Datatypes.INTEGER,
    allowNull: false,
  },
  value: {
    type: Datatypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false,
});

formSubmissionValuesModel.belongsTo(formSubmissionsModel, {
  foreignKey: "submission_id",
});

formSubmissionValuesModel.belongsTo(formFieldsModel, {
  foreignKey: "field_id",
});

formSubmissionsModel.hasMany(formSubmissionValuesModel, {
  foreignKey: "submission_id",
  as: "values",
  onDelete: "CASCADE",
});

formFieldsModel.hasMany(formSubmissionValuesModel, {
  foreignKey: "field_id",
  as: "submission_values",
  onDelete: "CASCADE",
});

module.exports = formSubmissionValuesModel;