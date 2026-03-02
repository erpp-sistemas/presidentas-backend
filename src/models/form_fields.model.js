const Datatypes = require("sequelize").DataTypes;
const sequelize = require("../config/dbConfig");

const formsModel = require("./forms.model");

const formFieldsModel = sequelize.define("form_fields", {
  id: {
    type: Datatypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  form_id: {
    type: Datatypes.INTEGER,
    allowNull: false,
  },
  label: {
    type: Datatypes.STRING(255),
    allowNull: false,
  },
  name: {
    type: Datatypes.STRING(255),
    allowNull: false,
  },
  type: {
    type: Datatypes.STRING(100),
    allowNull: false,
  },
  required: {
    type: Datatypes.BOOLEAN,
    defaultValue: false,
  },
  placeholder: {
    type: Datatypes.STRING(255),
    allowNull: true,
  },
  options: {
    type: Datatypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue("options");
      return rawValue ? JSON.parse(rawValue) : null;
    },
    set(value) {
      this.setDataValue("options", JSON.stringify(value));
    },
  },
  order_index: {
    type: Datatypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: false,
});

formFieldsModel.belongsTo(formsModel, {
  foreignKey: "form_id",
});

formsModel.hasMany(formFieldsModel, {
  foreignKey: "form_id",
  as: "fields",
  onDelete: "CASCADE",
});

module.exports = formFieldsModel;