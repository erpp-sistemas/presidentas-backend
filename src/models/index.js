const userModel = require("./users.model");
const formsModel = require("./forms.model");
const formSubmissionsModel = require("./form_submissions.model");
const formSubmissionValuesModel = require("./form_submission_values.model");
const formFieldsModel = require("./form_fields.model");

/* =============================
   USER RELATIONS
============================= */

userModel.hasMany(formSubmissionsModel, {
  foreignKey: "user_id",
  as: "userSubmissions"
});

formSubmissionsModel.belongsTo(userModel, {
  foreignKey: "user_id",
  as: "user"
});

/* =============================
   FORM RELATIONS
============================= */

/* =============================
   FORM ↔ FIELDS
============================= */

formsModel.hasMany(formFieldsModel, {
  foreignKey: "form_id",
  as: "fields",
});

formFieldsModel.belongsTo(formsModel, {
  foreignKey: "form_id",
  as: "form",
});

formsModel.hasMany(formSubmissionsModel, {
  foreignKey: "form_id",
  as: "formSubmissions"
});

formSubmissionsModel.belongsTo(formsModel, {
  foreignKey: "form_id",
  as: "form"
});

/* =============================
   SUBMISSION VALUES
============================= */

formSubmissionsModel.hasMany(formSubmissionValuesModel, {
  foreignKey: "submission_id",
  as: "values"
});

formSubmissionValuesModel.belongsTo(formSubmissionsModel, {
  foreignKey: "submission_id",
  as: "submission"
});

formFieldsModel.hasMany(formSubmissionValuesModel, {
  foreignKey: "field_id",
  as: "fieldValues"
});

formSubmissionValuesModel.belongsTo(formFieldsModel, {
  foreignKey: "field_id",
  as: "field"
});

module.exports = {
  userModel,
  formsModel,
  formSubmissionsModel,
  formSubmissionValuesModel,
  formFieldsModel
};