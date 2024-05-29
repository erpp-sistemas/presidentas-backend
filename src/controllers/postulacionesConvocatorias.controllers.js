const postulacionesConvocatoriasModel = require("../models/postulacionesConvocatorias.model");

const getAllPostulacionesConvocatorias = async () => {
  const postulacionesConvocatorias = await postulacionesConvocatoriasModel.findAll();
  return postulacionesConvocatorias;
};

const getByIdPostulacionesConvocatoria = async (user,convocatoria) => {
  const postulacionesConvocatorias = await postulacionesConvocatoriasModel.findOne({ where: { user_id:user,convocatoria_id:convocatoria } });
  if (!postulacionesConvocatorias) {
    throw { message: "This id not exist", status: 404 };
  }
  return postulacionesConvocatorias;
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
};