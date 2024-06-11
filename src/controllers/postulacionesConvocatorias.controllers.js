const { Sequelize, Op } = require("sequelize");
const fileModel = require("../models/file.model");
const postulacionesConvocatoriasModel = require("../models/postulacionesConvocatorias.model");
const userModel = require("../models/users.model");
const { formatDateText } = require("../toolkit/formatDate");
const convocatoriaModel = require("../models/convocatoria.model");
const categoriaConvocatoriaModel = require("../models/categoriasConvocatoria.model");

const getAllPostulacionesConvocatorias = async (c) => {
  const postulacionesConvocatorias = await postulacionesConvocatoriasModel.findAll(
    {
      where:{convocatoria_id:c},
      include:{
        model:userModel,
        attributes:{
          exclude:["contrasena","curp","tell","calle","numeroExt","colonia","tell_casa","fecha_nacimiento","rol","nvl_academico"],
          include: [[Sequelize.literal("CONCAT(nombre, ' ', apellidop, ' ', apellidom)"), 'nombre_completo']]
        },
        include:[
          {
            model:fileModel,
            where:{fileId:"1"},
            required: false,
        },
        ]
      }
  });

  const postulacines=[]
  for(let p of postulacionesConvocatorias){
      const fechaFormateda=formatDateText(p.created_at)
      console.log(fechaFormateda)
      const instance={...p.dataValues,fechaFormateda}
      postulacines.push(instance)
  }


  return postulacines;
};

const getByIdPostulacionesConvocatoria = async (user,convocatoria) => {
  const postulacionesConvocatorias = await postulacionesConvocatoriasModel.findOne({ where: { user_id:user,convocatoria_id:convocatoria } });
  if (!postulacionesConvocatorias) {
    throw { message: "This id not exist", status: 404 };
  }
  return postulacionesConvocatorias;
};

const getByIdPostulacionesConvocatoriaAllInfo = async (user,convocatoria) => {
  let postulacionesConvocatorias = await postulacionesConvocatoriasModel.findOne(
    { 
      where: { user_id:user,convocatoria_id:convocatoria },
      include:[{
        model:userModel,
        attributes:{exclude:["contrasena"]},
        include:[{
          model:fileModel,
          required: false,
        }]
      },{
        model:convocatoriaModel,
      }
    ],
   
   });


       const fechaFormateda=formatDateText(postulacionesConvocatorias.created_at)
   
       const instance={...postulacionesConvocatorias.dataValues,fechaFormateda}

        const categoriasInstance=instance.convocatoria.categorias_id.split(",")
        console.log(instance.convocatoria)
        console.log(categoriasInstance)
  
            const categorias=await categoriaConvocatoriaModel.findAll({where:{id:{[Op.in]:[categoriasInstance]}}})
        
      
      let apt={...instance,convocatoria:{...instance.convocatoria.dataValues,categorias}}
    
      console.log(apt)
    

     
  
  if (!postulacionesConvocatorias) {
    throw { message: "This id not exist", status: 404 };
  }


  return apt;
};

const newPostulacionesConvocatoria = async (data) => {
  const postulacionesConvocatorias = await postulacionesConvocatoriasModel.create({ ...data,activo: 1 });
  return postulacionesConvocatorias;
};

const updateByIdPostulacionesConvocatoria = async (data, id) => {
  const postulacionesConvocatorias = await postulacionesConvocatoriasModel.update(data, { where: { id } });
  return postulacionesConvocatorias;
};

const deleteByIdPostulacionesConvocatoria = async (id) => {
  const postulacionesConvocatorias = await postulacionesConvocatoriasModel.destroy({ where: { id } });
  return postulacionesConvocatorias;
};

module.exports = {
  getAllPostulacionesConvocatorias,
  getByIdPostulacionesConvocatoria,
  newPostulacionesConvocatoria,
  updateByIdPostulacionesConvocatoria,
  deleteByIdPostulacionesConvocatoria,
  getByIdPostulacionesConvocatoriaAllInfo
};





