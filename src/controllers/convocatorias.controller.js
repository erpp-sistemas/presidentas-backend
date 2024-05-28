const { Sequelize } = require("sequelize");
const convocatoriasModel = require("../models/convocatoria.model");
const { formatDateText } = require("../toolkit/formatDate");
const categoriaConvocatoriaModel = require("../models/categoriasConvocatoria.model");
const keyFilesModel = require("../models/keys.model");

const getAllConvocatorias = async () => {
  let convocatorias = await convocatoriasModel.findAll({order:[  ['id', 'DESC'] ]});
  const instance=[]

for(let c of convocatorias){
    const categoriasInstance=c.categorias_id.split(",")
    const categorias=[]
    for(let d of categoriasInstance ){
        const categoria=await categoriaConvocatoriaModel.findAll({where:{id:d}})
        categorias.push(categoria[0])
    }
  const formatoFecha=formatDateText(c.fecha_limite_postulacion)
  let apt={...c.dataValues,formatoFecha,categorias}

  instance.push(apt)
}


  return instance;
};

const getByIdConvocatoria = async (id) => {

  let convocatorias = await convocatoriasModel.findOne({ where: { id } });
 
  if (!convocatorias) {
    throw { message: "This id not exist", status: 404 };
  }
  let eventDate = new Date(convocatorias.fecha_limite_postulacion).toISOString();
  [fecha]=eventDate.split('Z')
 
  convocatorias.dataValues={...convocatorias.dataValues ,fecha_limite_postulacion:`${fecha}`}

    const categoriasInstance=convocatorias.categorias_id.split(",")
    const categorias=[]
    for(let d of categoriasInstance ){
        const categoria=await categoriaConvocatoriaModel.findAll({where:{id:d}})
        categorias.push(categoria[0])
    }
    const documentosInstance=convocatorias?.files_keys?convocatorias?.files_keys.split(","):[]
    const documentos=[]
    console.log(documentosInstance)

    for(let d of documentosInstance ){
      
        const documento=await keyFilesModel.findAll({where:{key_file:d}})
        documentos.push(documento[0])
    }
    
  const formatoFecha=formatDateText(convocatorias.fecha_limite_postulacion)
  let apt={...convocatorias.dataValues,formatoFecha,documentos,categorias}

  


  return apt;
};

const newConvocatoria = async (data) => {
    const [fecha,hora]=data.fecha_limite_postulacion.split("T")
  const convocatorias = await convocatoriasModel.create({ ...data,fecha_limite_postulacion:`${fecha} ${hora}`,activo: 1 });
  return convocatorias;
};

const updateByIdConvocatoria = async (data, id) => {

  const [fecha,hora]=data.fecha_limite_postulacion.split("T")
  data={...data,fecha_limite_postulacion:`${fecha} ${hora}`}

  const convocatorias = await convocatoriasModel.update(data, { where: { id } });
  return convocatorias;
};

const deleteByIdConvocatoria = async (id) => {
  const convocatorias = await convocatoriasModel.destroy({ where: { id } });
  return convocatorias;
};

module.exports = {
  getAllConvocatorias,
  getByIdConvocatoria,
  newConvocatoria,
  updateByIdConvocatoria,
  deleteByIdConvocatoria,
};