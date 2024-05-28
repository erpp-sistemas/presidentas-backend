
const DataTypes= require("sequelize").DataTypes

const sequelize=require('../config/dbConfig')
const fileModel = require("./file.model")




const keyFilesModel=sequelize.define("filesKeys",{
    
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    key_file:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    nombre_file:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:false,
   
    },
    tipo_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    activo:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

},{
    timestamps:false
})

keyFilesModel.hasOne(fileModel,{foreignKey:"fileId"})


module.exports=keyFilesModel




