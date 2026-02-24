const Datatypes = require('sequelize').DataTypes
const sequelize = require('../config/dbConfig')

const userModel = require('./users.model')

const redesSocialesModel = sequelize.define('redes_sociales',{
    id:{
        type: Datatypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_user:{
        type: Datatypes.STRING,
        allowNull:false
    },
    facebook:{
        type: Datatypes.STRING,
        allowNull:true
    },
    instagram:{
        type: Datatypes.STRING,
        allowNull:true
    },
    tiktok:{
        type: Datatypes.STRING,
        allowNull:true
    }
},{
    timestamps:false
})

redesSocialesModel.belongsTo(userModel,{foreignKey:"id_user"})
userModel.hasOne(redesSocialesModel,{foreignKey:"id_user", as:"redes"})

module.exports = redesSocialesModel