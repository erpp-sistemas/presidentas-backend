



const DataTypes= require("sequelize").DataTypes

const sequelize=require('../config/dbConfig')
const keyFilesModel = require("./keys.model")


const fileTypeModel=sequelize.define("fileTypes",{

    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    tipo:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:false,
   
    },

},{
    timestamps:false
})


fileTypeModel.hasMany(keyFilesModel ,{foreignKey:"tipo_id"})


module.exports=fileTypeModel
