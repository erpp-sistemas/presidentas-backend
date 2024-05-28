const { DataTypes } = require("sequelize");
const  Sequelize  = require("../config/dbConfig");




const categoriaConvocatoriaModel=Sequelize.define("categorias_convocatorias",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    nombre_categoria:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
},{
    timestamps:false
})


module.exports=categoriaConvocatoriaModel

