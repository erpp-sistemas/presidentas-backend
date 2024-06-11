const convocatoriaModel = require("../models/convocatoria.model");
const convocatoriasGuardadasModel = require("../models/convocatoriasGuardadas.model");

const getAllConvocatoriasGuardadas = async (usuario_id) => {
  const convocatoriasGuardadas = await convocatoriasGuardadasModel.findAll({
    where:{usuario_id},
    include:{
      model:convocatoriaModel,
      attributes:["titulo_convocatoria","des_breve","created_at"],
    }
});

  return convocatoriasGuardadas;
};

const getByIdConvocatoriasGuardada = async (convocatoria_id,usuario_id) => {
  const convocatoriasGuardadas = await convocatoriasGuardadasModel.findOne({ where: { convocatoria_id,usuario_id }, attributes:["id"]});
  if (!convocatoriasGuardadas) {
    throw { message: "This id not exist", status: 404 };
  }
  return convocatoriasGuardadas;
};

const newConvocatoriasGuardada = async (data,usuario_id) => {
  const existeConvocatoria=await convocatoriasGuardadasModel.findOne({where:{convocatoria_id:data.convocatoria_id,usuario_id}})
  if(existeConvocatoria){
    await convocatoriasGuardadasModel.destroy({ where: { id:existeConvocatoria.id } });
    throw {message:"this save was delete success full",status:404}
  }
  const convocatoriasGuardadas = await convocatoriasGuardadasModel.create({ ...data,usuario_id});
  return convocatoriasGuardadas;
};

const updateByIdConvocatoriasGuardada = async (data, id) => {
  const convocatoriasGuardadas = await convocatoriasGuardadasModel.update(data, { where: { id } });
  return convocatoriasGuardadas;
};

const deleteByIdConvocatoriasGuardada = async (id) => {
  const convocatoriasGuardadas = await convocatoriasGuardadasModel.destroy({ where: { id } });
  return convocatoriasGuardadas;
};

module.exports = {
  getAllConvocatoriasGuardadas,
  getByIdConvocatoriasGuardada,
  newConvocatoriasGuardada,
  updateByIdConvocatoriasGuardada,
  deleteByIdConvocatoriasGuardada,
};