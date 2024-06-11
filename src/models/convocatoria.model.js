const { DataTypes } = require("sequelize");
const Sequelize  = require("../config/dbConfig");
const { formatDateText } = require("../toolkit/formatDate");
// const postulacionesConvocatoriaModel = require("./postulacionesConvocatorias.model");


const convocatoriaModel=Sequelize.define("convocatorias",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    titulo_convocatoria:{
        type:DataTypes.STRING,
        allowNull:false
    },
    categorias_id:{
        type:DataTypes.STRING,
        allowNull:false
    },
    des_breve:{
        type:DataTypes.STRING,
        allowNull:false
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    files_keys:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fecha_limite_postulacion:{
        type:DataTypes.STRING,
        allowNull:false,
        get() {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>FORMATEANDO FECHAS")
            const fecha = this.getDataValue('fecha_limite_postulacion');
            const allFechas=formatDateText(fecha)
           
            console.log({...allFechas} );
            return fecha ? {...allFechas} : null;
        }
    },
    activo:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
},{
    timestamps:false
})



module.exports=convocatoriaModel




