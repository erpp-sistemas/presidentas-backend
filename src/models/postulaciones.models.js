const { DataTypes } = require('sequelize')
const sequelize=require('../config/dbConfig')
const convocatoriaModel = require('./convocatoria.model');
const { formatDateText } = require('../toolkit/formatDate');
const estatusPostulacionesModel = require('./estatusPostulaciones.models');
const userModel = require('./users.model');


const postulacionesModel=sequelize.define("postulaciones",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        convocatoria_id :{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        usuario_id:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        estatus_id:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        created_at:{
            type:DataTypes.DATE,
            allowNull:true,
            get() {
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>FORMATEANDO FECHAS")
                const fecha = this.getDataValue('created_at');
                return fecha ? formatDateText(fecha) : null;
            }
        },

},{timestamps:false})


postulacionesModel.belongsTo(convocatoriaModel,{ foreignKey: "convocatoria_id",targetKey:"id" })
postulacionesModel.belongsTo(estatusPostulacionesModel,{ foreignKey: "estatus_id",targetKey:"id" })
estatusPostulacionesModel.hasMany(postulacionesModel,{ foreignKey: "id",targetKey:"estatus_id" })

postulacionesModel.belongsTo(userModel, { foreignKey: "usuario_id",targetKey:"id" });

convocatoriaModel.hasMany(postulacionesModel, { foreignKey: 'convocatoria_id',targetKey:"id" });





module.exports=postulacionesModel


