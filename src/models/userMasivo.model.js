const Datatypes=require('sequelize').DataTypes
const sequelize=require('../config/dbConfig')
const fileModel = require('./file.model')



const userMasivoModel=sequelize.define('users',{
    id:{
        type:Datatypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    nombre:{
        type:Datatypes.STRING,
        allowNull:false,
    },
    apellidop:{
        type:Datatypes.STRING,
        allowNull:true
    },
    apellidom:{
        type:Datatypes.STRING,
        allowNull:true
    },
    correo: {
        type:Datatypes.STRING,
        unique:true,
        allowNull:false
    },
    tell:{
            type:Datatypes.NUMBER,
            allowNull:false
    },
    colonia:{
        type:Datatypes.STRING,
        allowNull:true
    },
    rol:{
        type:Datatypes.INTEGER,
        allowNull:false
    }

},{
    timestamps:false
})

userMasivoModel.hasMany(fileModel,{foreignKey:"userId"})




module.exports=userMasivoModel

















