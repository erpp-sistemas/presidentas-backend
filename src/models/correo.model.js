const  DataTypes= require("sequelize").DataTypes
const sequelize = require("../config/dbConfig.js");



const correosModel=sequelize.define("correos",{


    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    nombre_correo:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    asunto:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    html:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    activo:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1
    },

},{
    timestamps:false
})


module.exports=correosModel





