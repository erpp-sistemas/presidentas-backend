const sequelize=require('../config/dbConfig')
const DataTypes=require('sequelize').DataTypes



const codigoModel=sequelize.define("codigos",{
    tell:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    codigo:{
        type:DataTypes.STRING,
        allowNull:false,
    }    
},{
    timestamps:false
})

module.exports=codigoModel