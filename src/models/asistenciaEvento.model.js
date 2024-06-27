const Datatypes=require('sequelize').DataTypes
const sequelize=require('../config/dbConfig')
const userModel = require('../models/users.model')




const asistenciaEventoModel=sequelize.define('asistencia_evento',{
    id:{
        type:Datatypes.STRING,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    id_user:{
        type:Datatypes.STRING,
        allowNull:false,
    },
    id_evento:{
        type:Datatypes.NUMBER,
        allowNull:true
    },
    fecha_asistencia:{
        type:Datatypes.STRING,
        allowNull:false
    }

},{
    timestamps:false,
    freezeTableName:true
})

userModel.hasMany(asistenciaEventoModel,{foreignKey:"id_user"})




module.exports=asistenciaEventoModel

















