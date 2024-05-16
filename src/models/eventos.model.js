const  DataTypes= require("sequelize").DataTypes
const sequelize = require("../config/dbConfig.js");



const eventosModel=sequelize.define("eventos",{


    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    fecha_evento:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    url_foto:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    posicion:{
        type:DataTypes.NUMBER,
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


module.exports=eventosModel





