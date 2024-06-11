const { DataTypes } = require('sequelize')
const sequelize=require('../config/dbConfig')




const estatusPostulacionesModel=sequelize.define("estatus_postulacion",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        nombre_estatus:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        color:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        

},{timestamps:false,freezeTableName:true})





module.exports=estatusPostulacionesModel


