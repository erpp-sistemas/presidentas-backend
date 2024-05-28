const categoriaConvocatoriasModel = require("../models/categoriasConvocatoria.model");

const getAllCategoriaConvocatorias = async () => {
  const categoriaConvocatorias = await categoriaConvocatoriasModel.findAll();
  return categoriaConvocatorias;
};

const getByIdCategoriaConvocatoria = async (id) => {
  const categoriaConvocatorias = await categoriaConvocatoriasModel.findOne({ where: { id } });
  if (!categoriaConvocatorias) {
    throw { message: "This id not exist", status: 404 };
  }
  return categoriaConvocatorias;
};

const newCategoriaConvocatoria = async (data) => {
  const categoriaConvocatorias = await categoriaConvocatoriasModel.create(data);
  return categoriaConvocatorias;
};

const updateByIdCategoriaConvocatoria = async (data, id) => {
  const categoriaConvocatorias = await categoriaConvocatoriasModel.update(data, { where: { id } });
  return categoriaConvocatorias;
};

const deleteByIdCategoriaConvocatoria = async (id) => {
  const categoriaConvocatorias = await categoriaConvocatoriasModel.destroy({ where: { id } });
  return categoriaConvocatorias;
};

module.exports = {
  getAllCategoriaConvocatorias,
  getByIdCategoriaConvocatoria,
  newCategoriaConvocatoria,
  updateByIdCategoriaConvocatoria,
  deleteByIdCategoriaConvocatoria,
};