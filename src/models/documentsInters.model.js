const  DataTypes= require("sequelize").DataTypes
const sequelize = require("../config/dbConfig.js");



const documentosInteresModel=sequelize.define("documentos_interes",{


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
    url_documento:{
        type:DataTypes.STRING,
        allowNull:false,
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


module.exports=documentosInteresModel





