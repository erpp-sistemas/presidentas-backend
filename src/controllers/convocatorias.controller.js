const convocatoriasModel = require("../models/convocatoria.model");
const { formatDateText } = require("../toolkit/formatDate");
const categoriaConvocatoriaModel = require("../models/categoriasConvocatoria.model");
const keyFilesModel = require("../models/keys.model");
const postulacionesConvocatoriaModel = require("../models/postulacionesConvocatorias.model");
const { literal, Op } = require("sequelize");
const postulacionesModel = require("../models/postulaciones.models");
const convocatoriasGuardadasModel = require("../models/convocatoriasGuardadas.model");

const getAllConvocatorias = async () => {
  
   let convocatorias = await convocatoriasModel.findAll({
      order: [["id", "DESC"]],
      attributes: {
         exclude: ["descripcion"],
         include: [
            [
               literal(`(
            SELECT COUNT(*)
            FROM postulaciones AS post
            WHERE post.convocatoria_id = convocatorias.id
          )`),
               "postulacionesCount",
            ],
         ],
      },
   });
   const instance = [];
   
  

   for (let c of convocatorias) {
      const fecha_limite_postulacion=c.fecha_limite_postulacion
      const categoriasInstance = c.categorias_id.split(",");
      const categorias = [];
      for (let d of categoriasInstance) {
         const categoria = await categoriaConvocatoriaModel.findAll({ where: { id: d } });
         categorias.push(categoria[0]);
      }
      let apt = { ...c.dataValues,fecha_limite_postulacion ,categorias };

      instance.push(apt);
   }

   return instance;
};

const getByIdConvocatoria = async (id) => {
   let convocatorias = await convocatoriasModel.findOne({ where: { id } });

   if (!convocatorias) {
      throw { message: "This id not exist", status: 404 };
   }

   const fecha_limite_postulacion=convocatorias.fecha_limite_postulacion

   const categoriasInstance = convocatorias.categorias_id.split(",").map(Number);
  
   const categorias = await categoriaConvocatoriaModel.findAll({ where: { id: { [Op.in]: categoriasInstance } } });

   const documentosInstance = convocatorias?.files_keys ? convocatorias?.files_keys.split(",") : [];

   const documentos = await keyFilesModel.findAll({ where: { key_file: { [Op.in]: documentosInstance } } });

   let apt = { ...convocatorias.dataValues,fecha_limite_postulacion, documentos, categorias };

   return apt;
};

const newConvocatoria = async (data) => {
   const [fecha, hora] = data.fecha_limite_postulacion.split("T");
   const convocatorias = await convocatoriasModel.create({ ...data, fecha_limite_postulacion: `${fecha} ${hora}`, activo: 1 });
   return convocatorias;
};

const updateByIdConvocatoria = async (data, id) => {

   const [fecha, hora] = data.fecha_limite_postulacion.split("T");
   data = { ...data, fecha_limite_postulacion: `${fecha} ${hora}` };
   console.log(data)

   const convocatorias = await convocatoriasModel.update(data, { where: { id } });
   return convocatorias;
};

const activeByIdConvocatoria = async (data, id) => {

   const convocatorias = await convocatoriasModel.update({activo:data.activo}, { where: { id } });
   return convocatorias;
};

const deleteByIdConvocatoria = async (id) => {


   await convocatoriasGuardadasModel.destroy({ where: { convocatoria_id:id } });
   await postulacionesModel.destroy({ where: { convocatoria_id:id } });
   const convocatorias = await convocatoriasModel.destroy({ where: { id } });


   return convocatorias;
};

module.exports = {
   getAllConvocatorias,
   getByIdConvocatoria,
   newConvocatoria,
   updateByIdConvocatoria,
   deleteByIdConvocatoria,
   activeByIdConvocatoria
};
