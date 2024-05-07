const DataTypes=require('sequelize').DataTypes

const sequelize=require('../config/dbConfig')


const fileModel=sequelize.define("filesUsers",{

    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    fileId :{
        type:DataTypes.INTEGER,
        allowNull:false
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






module.exports=fileModel







