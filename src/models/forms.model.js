const Datatypes = require("sequelize").DataTypes;
const sequelize = require("../config/dbConfig");

const formsModel = sequelize.define("forms", {
  id: {
    type: Datatypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: Datatypes.STRING(100),
    allowNull: false,
  },
  descripcion: {
    type: Datatypes.STRING(255),
    allowNull: true,
  },
  created_by: {
    type: Datatypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: "forms",
  timestamps: false
});

formsModel.associate = (models) => {
  formsModel.hasMany(models.FormFields, {
    foreignKey: "form_id",
    as: "fields",
  });
};

module.exports = formsModel;