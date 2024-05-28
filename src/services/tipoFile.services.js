const c = require('../controllers/tipoFile.controllers');


const httpGetAllTipoFiles = async (req, res) => {
  const tipoFiles = await c.getAllTipoFiles();
  res.status(200).json({ tipoFiles });
}

const httpGetByIdTipoFile = async (req, res) => {
  const id = req.params.id;
  const tipoFile = await c.getByIdTipoFile(id);
  res.status(200).json({ tipoFile });
}

const httpNewTipoFile = async (req, res) => {
  const data = req.body;
  const tipoFile = await c.newTipoFile(data);
  res.status(201).json({ tipoFile });
}

const httpUpdateTipoFile = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const tipoFile = await c.updateByIdTipoFile(data, id);
  res.status(200).json({ tipoFile });
}

const httpDeleteTipoFile = async (req, res) => {
  const id = req.params.id;
  const tipoFile = await c.deleteByIdTipoFile (id);
  res.status(200).json({ Message: 'this event was delete success' });
}

module.exports = {
  httpGetAllTipoFiles ,
  httpGetByIdTipoFile ,
  httpDeleteTipoFile ,
  httpNewTipoFile ,
  httpUpdateTipoFile ,
}