
const { DataTypes } = require('sequelize')
const sequelize=require('../config/dbConfig');
const userModel = require('./users.model');
const convocatoriaModel = require('./convocatoria.model');
// const convocatoriaModel = require('./convocatoria.model');



const postulacionesConvocatoriaModel=sequelize.define('postulaciones_convocatorias',{

    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    user_id:{
        type:DataTypes.STRING,
        allowNull:false
    },
    convocatoria_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    created_at:{
        type:DataTypes.STRING,
        allowNull:true,
    }

},{
    timestamps:false
})

postulacionesConvocatoriaModel.belongsTo(userModel, { foreignKey: "user_id",targetKey:"id" });
postulacionesConvocatoriaModel.belongsTo(convocatoriaModel, { foreignKey: "convocatoria_id",targetKey:"id" });
convocatoriaModel.hasMany(postulacionesConvocatoriaModel, { foreignKey: 'convocatoria_id',targetKey:"id" });



module.exports=postulacionesConvocatoriaModel

