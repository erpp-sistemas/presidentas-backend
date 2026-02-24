const Datatypes = require('sequelize').DataTypes
const sequelize = require('../config/dbConfig')

const municipioModel = sequelize.define('municipio',{
    id:{
        type: Datatypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type: Datatypes.STRING,
        allowNull:false
    }
},{
    tableName: 'municipio',
    freezeTableName: true,
    timestamps:false,
})

module.exports = municipioModel