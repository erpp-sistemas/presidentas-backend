const Datatypes = require('sequelize').DataTypes
const sequelize = require('../config/dbConfig')

const userModel = require('./users.model')
const municipioModel = require('./municipio.model')

const userMunicipioModel = sequelize.define('user_municipio',{
    id:{
        type: Datatypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_user:{
        type: Datatypes.STRING,
        allowNull:false
    },
    id_municipio:{
        type: Datatypes.INTEGER,
        allowNull:false
    }
},{
    tableName: 'user_municipio',
    freezeTableName: true,
    timestamps:false
})

userMunicipioModel.belongsTo(userModel,{foreignKey:"id_user", as:"usuario"})
userMunicipioModel.belongsTo(municipioModel,{foreignKey:"id_municipio", as:"municipio"})

userModel.hasOne(userMunicipioModel,{foreignKey:"id_user", as:"municipioRelacion"})
municipioModel.hasMany(userMunicipioModel,{foreignKey:"id_municipio"})

module.exports = userMunicipioModel