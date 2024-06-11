const uuid = require("uuid");
const filesModel = require("../models/keys.model");

const getAllFiles = async () => {
  const files = await filesModel.findAll();
  return files;
};

const getByIdFile = async (id) => {
  const files = await filesModel.findOne({ where: { key_file:id } });
  if (!files) {
    throw { message: "This id not exist", status: 404 };
  }
  return files;
};

const newFile = async (data) => {

    const key_file=uuid.v4()
    console.log(key_file)

    const files = await filesModel.create({ ...data,activo: 1,key_file });
    return files;
};

const updateByIdFile = async (data, id) => {
  const files = await filesModel.update(data, { where: { id } });
  return files;
};

const deleteByIdFile = async (id) => {
  const files = await filesModel.destroy({ where: { id } });
  return files;
};

module.exports = {
  getAllFiles,
  getByIdFile,
  newFile,
  updateByIdFile,
  deleteByIdFile,
};