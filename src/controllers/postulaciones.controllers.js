const { Sequelize, Op } = require("sequelize");
const convocatoriaModel = require("../models/convocatoria.model");
const estatusPostulacionesModel = require("../models/estatusPostulaciones.models");
const postulacionesModel = require("../models/postulaciones.models");
const fileModel = require("../models/file.model");
const userModel = require("../models/users.model");
const keyFilesModel = require("../models/keys.model");

const getAllPostulaciones = async (usuario_id) => {
  
      const postulaciones = await postulacionesModel.findAll({
        where:{usuario_id},
        include:[{
            model:convocatoriaModel,
            attributes:["titulo_convocatoria","des_breve","created_at","activo"],
          },{
            model:estatusPostulacionesModel
          }
        ]
    });

    const PostulacionesConteo = await estatusPostulacionesModel.findAll({
      attributes: [
          'id', 
          'nombre_estatus',
          [Sequelize.literal(`(
              SELECT COUNT(*)
              FROM postulaciones AS p
              WHERE
                  p.estatus_id = estatus_postulacion.id AND
                  p.usuario_id = '${usuario_id}'
          )`), 'total']
      ],
      order: [['id', 'ASC']]
  });
    
  console.log(postulaciones)

  return {postulaciones_conteo:PostulacionesConteo,postulaciones};
};

const getByIdPostulacione = async (id) => {
  const postulaciones = await postulacionesModel.findOne({ 
    where: { id },
    include:[
      {
        model:convocatoriaModel,
        attributes:["id","titulo_convocatoria","categorias_id","files_keys","activo"]
      },
    {
      model:userModel,
      attributes:{
        exclude:["contrasena","tell_casa","rol","nvl_academico"],
        include: [[Sequelize.literal("CONCAT(nombre, ' ', apellidop, ' ', apellidom)"), 'nombre_completo']]
      },
      include:[
        {
          model:fileModel,
          where:{fileId:1},
          required: false,
      },
      ]
    }]
  
  });
  if (!postulaciones) {
    throw { message: "This id not exist", status: 404 };
  }
  const created_at=postulaciones.created_at

  const documentosInstance = postulaciones?.convocatoria.files_keys ? postulaciones?.convocatoria.files_keys.split(",") : [];

  const documentos = await keyFilesModel.findAll({ where: { key_file: { [Op.in]: documentosInstance } } });

  return {...postulaciones.dataValues,documentos,created_at};
};





const getALlpostualcionesByConvocatoria = async (id) => {
  const postulaciones = await postulacionesModel.findAll(
    {
      where:{convocatoria_id:id},
      include:[
      {
          model:userModel,
          attributes:{
           
            exclude:["contrasena","curp","tell","calle","numeroExt","colonia","tell_casa","fecha_nacimiento","rol","nvl_academico"],
            include: [[Sequelize.literal("CONCAT(nombre, ' ', apellidop, ' ', apellidom)"), 'nombre_completo']]
          },
          include:[
            {
              model:fileModel,
              where:{fileId:1},
              required: false,
          },
          ]
        }
      ]
  });

  if (!postulaciones) {
    throw { message: "This id not exist", status: 404 };
  }
  console.log(postulaciones)
  return postulaciones;
};

const estaPostulado = async (usuario_id,convocatoria_id) => {
  const postulacionesConvocatorias = await postulacionesModel.findOne({ where: { usuario_id,convocatoria_id}});
  if (!postulacionesConvocatorias) {
    throw { message: "This id not exist", status: 404 };
  }
  return postulacionesConvocatorias;
};



const newPostulacione = async (data,usuario_id) => {
  const postulaciones = await postulacionesModel.create({ ...data,usuario_id,estatus_id:1});
  return postulaciones;
};

const updateByIdPostulacione = async (data, id) => {
  const postulaciones = await postulacionesModel.update(data, { where: { id } });
  return postulaciones;
};

const deleteByIdPostulacione = async (id) => {
  const postulaciones = await postulacionesModel.destroy({ where: { id } });
  return postulaciones;
};

module.exports = {
  getAllPostulaciones,
  getByIdPostulacione,
  newPostulacione,
  updateByIdPostulacione,
  deleteByIdPostulacione,
  estaPostulado,
  getALlpostualcionesByConvocatoria
};