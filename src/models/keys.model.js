
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
    nameFile:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    active:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

},{
    timestamps:false
})

keyFilesModel.hasOne(fileModel,{foreignKey:"fileId"})


module.exports=keyFilesModel




