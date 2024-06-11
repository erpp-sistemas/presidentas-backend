const DataTypes=require('sequelize').DataTypes

const sequelize=require('../config/dbConfig');
// const keyFilesModel = require('./keys.model');
// const keyFilesModel = require('./keys.model')


const fileModel=sequelize.define("filesUsers",{

    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    fileId :{
        type:DataTypes.STRING,
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


// fileModel.belongsTo(keyFilesModel, { foreignKey: "fileId",targetKey:"id" });



module.exports=fileModel







