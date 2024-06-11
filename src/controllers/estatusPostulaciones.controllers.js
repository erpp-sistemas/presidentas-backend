const estatusPostulacionesModel = require("../models/estatusPostulaciones.models");

const getAllEstatusPostulaciones = async () => {
  const estatusPostulaciones = await estatusPostulacionesModel.findAll();
  return estatusPostulaciones;
};

const getByIdEstatusPostulacione = async (id) => {
  const estatusPostulaciones = await estatusPostulacionesModel.findOne({ where: { id } });
  if (!estatusPostulaciones) {
    throw { message: "This id not exist", status: 404 };
  }
  return estatusPostulaciones;
};

const newEstatusPostulacione = async (data) => {
  const estatusPostulaciones = await estatusPostulacionesModel.create({ ...data,activo: 1 });
  return estatusPostulaciones;
};

const updateByIdEstatusPostulacione = async (data, id) => {
  const estatusPostulaciones = await estatusPostulacionesModel.update(data, { where: { id } });
  return estatusPostulaciones;
};

const deleteByIdEstatusPostulacione = async (id) => {
  const estatusPostulaciones = await estatusPostulacionesModel.destroy({ where: { id } });
  return estatusPostulaciones;
};

module.exports = {
  getAllEstatusPostulaciones,
  getByIdEstatusPostulacione,
  newEstatusPostulacione,
  updateByIdEstatusPostulacione,
  deleteByIdEstatusPostulacione,
};