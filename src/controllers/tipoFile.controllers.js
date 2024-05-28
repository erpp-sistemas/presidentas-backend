const tipoFilesModel = require("../models/fileType.model");
const keyFilesModel = require("../models/keys.model");

const getAllTipoFiles = async () => {
  const tipoFiles = await tipoFilesModel.findAll({include:[
       {
    model:keyFilesModel,
    require:false
  }
  ]});

  return tipoFiles;
};

const getByIdTipoFile = async (id) => {
  const tipoFiles = await tipoFilesModel.findOne({ where: { id },include:[
   {
    model:keyFilesModel,
    required:false
   }
  ] }
  );

  if (!tipoFiles) {
    throw { message: "This id not exist", status: 404 };
  }
  return tipoFiles;
};

const newTipoFile = async (data) => {
  const tipoFiles = await tipoFilesModel.create({ ...data,activo: 1 });
  return tipoFiles;
};

const updateByIdTipoFile = async (data, id) => {
  const tipoFiles = await tipoFilesModel.update(data, { where: { id } });
  return tipoFiles;
};

const deleteByIdTipoFile = async (id) => {
  const tipoFiles = await tipoFilesModel.destroy({ where: { id } });
  return tipoFiles;
};

module.exports = {
  getAllTipoFiles,
  getByIdTipoFile,
  newTipoFile,
  updateByIdTipoFile,
  deleteByIdTipoFile,
};