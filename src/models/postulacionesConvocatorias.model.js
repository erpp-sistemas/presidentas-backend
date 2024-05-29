
const { DataTypes } = require('sequelize')
const sequelize=require('../config/dbConfig')



const postulacionesConvocatoriaModel=sequelize.define('postulaciones_convocatorias',{

    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    user_id:{
        type:DataTypes.STRING,
        allowNull:false
    },
    convocatoria_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },

},{
    timestamps:false
})

module.exports=postulacionesConvocatoriaModel

