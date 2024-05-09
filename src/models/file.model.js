const DataTypes=require('sequelize').DataTypes

const sequelize=require('../config/dbConfig')
// const keyFilesModel = require('./keys.model')


const fileModel=sequelize.define("filesUsers",{

    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    fileId :{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    userId :{
        type:DataTypes.STRING,
        allowNull:false
    },
    urlFile :{
        type:DataTypes.TEXT,
        allowNull:false
    }

},{timestamps:false})


// fileModel.hasOne(keyFilesModel,{foreignKey:"id"})



module.exports=fileModel







