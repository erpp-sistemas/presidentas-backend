const c = require('../controllers/convocatorias.controller');


const httpGetAllConvocatorias = async (req, res) => {
  const convocatoria = await c.getAllConvocatorias();
  res.status(200).json({ convocatoria });
}

const httpGetByIdConvocatoria = async (req, res) => {
  const id = req.params.id;
  const convocatoria = await c.getByIdConvocatoria(id);
  res.status(200).json({ convocatoria });
}

const httpNewConvocatoria = async (req, res) => {
  const data = req.body;
  const convocatoria = await c.newConvocatoria(data);
  res.status(201).json({ convocatoria });
}

const httpUpdateConvocatoria = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const convocatoria = await c.updateByIdConvocatoria(data, id);
  res.status(200).json({ convocatoria });
}

const httpDeleteConvocatoria = async (req, res) => {
  const id = req.params.id;
  const convocatoria = await c.deleteByIdConvocatoria (id);
  res.status(200).json({ Message: 'this event was delete success' });
}

module.exports = {
  httpGetAllConvocatorias ,
  httpGetByIdConvocatoria ,
  httpDeleteConvocatoria ,
  httpNewConvocatoria ,
  httpUpdateConvocatoria ,
}