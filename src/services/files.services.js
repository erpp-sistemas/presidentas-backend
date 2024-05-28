const c = require('../controllers/files.controllers');


const httpGetAllFiles = async (req, res) => {
  const files = await c.getAllFiles();
  res.status(200).json({ files });
}

const httpGetByIdFile = async (req, res) => {
  const id = req.params.id;
  const file = await c.getByIdFile(id);
  res.status(200).json({ file });
}

const httpNewFile = async (req, res) => {
  const data = req.body;
  const file = await c.newFile(data);
  res.status(201).json({ file });
}

const httpUpdateFile = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const file = await c.updateByIdFile(data, id);
  res.status(200).json({ file });
}

const httpDeleteFile = async (req, res) => {
  const id = req.params.id;
  const file = await c.deleteByIdFile (id);
  res.status(200).json({ Message: 'this event was delete success' });
}

module.exports = {
  httpGetAllFiles ,
  httpGetByIdFile ,
  httpDeleteFile ,
  httpNewFile ,
  httpUpdateFile ,
}