const Datatypes=require('sequelize').DataTypes
const sequelize=require('../config/dbConfig')
const userModel = require('./users.model')




const tipoRegistroModel=sequelize.define('registros',{
    id:{
        type:Datatypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    id_user:{
        type:Datatypes.STRING,
        allowNull:true,
    },
    id_tipo:{
        type:Datatypes.INTEGER,
        allowNull:true
    },
    created_at:{
        type:Datatypes.STRING,
        allowNull:true
    }

},{
    timestamps:false
})

tipoRegistroModel.belongsTo(userModel, { foreignKey: 'id_user' });
userModel.hasMany(tipoRegistroModel, { foreignKey: 'id_user' });


module.exports=tipoRegistroModel

















