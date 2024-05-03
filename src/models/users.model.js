const Datatypes=require('sequelize').DataTypes
const sequelize=require('../config/dbConfig')


const userModel=sequelize.define('users',{
    id:{
        type:Datatypes.INTEGER,
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
    contrasena:{
        type:Datatypes.STRING,
        allowNull:false
    },
    tell:{
        type:{
            type:Datatypes.NUMBER,
            allowNull:false
        }
    },
    fecha_nacimiento:{
        type:Datatypes.DATE,
        allowNull:false
    },
    rol:{
        type:Datatypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:false
})




module.exports=userModel

















