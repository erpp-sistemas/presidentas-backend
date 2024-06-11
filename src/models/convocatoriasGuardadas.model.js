const { DataTypes } = require('sequelize')
const sequelize=require('../config/dbConfig')
const convocatoriaModel = require('./convocatoria.model');
const { formatDateText } = require('../toolkit/formatDate');






const convocatoriasGuardadasModel=sequelize.define("convocatorias_guardadas",{
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
        created_at:{
            type:DataTypes.DATE,
            allowNull:true,
            get() {
                const fecha = this.getDataValue('created_at');
                return fecha ? formatDateText(fecha) : null;
            }
        },

},{timestamps:false})


convocatoriasGuardadasModel.belongsTo(convocatoriaModel,{ foreignKey: "convocatoria_id",targetKey:"id" })


module.exports=convocatoriasGuardadasModel


