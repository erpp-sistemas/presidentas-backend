const c = require('../controllers/estatusPostulaciones.controllers');


const httpGetAllEstatusPostulaciones = async (req, res) => {
  const estatusPostulaciones = await c.getAllEstatusPostulaciones();
  res.status(200).json({ estatusPostulaciones });
}

const httpGetByIdEstatusPostulacione = async (req, res) => {
  const id = req.params.id;
  const estatusPostulacione = await c.getByIdEstatusPostulacione(id);
  res.status(200).json({ estatusPostulacione });
}

const httpNewEstatusPostulacione = async (req, res) => {
  const data = req.body;
  const estatusPostulacione = await c.newEstatusPostulacione(data);
  res.status(201).json({ estatusPostulacione });
}

const httpUpdateEstatusPostulacione = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const estatusPostulacione = await c.updateByIdEstatusPostulacione(data, id);
  res.status(200).json({ estatusPostulacione });
}

const httpDeleteEstatusPostulacione = async (req, res) => {
  const id = req.params.id;
  const estatusPostulacione = await c.deleteByIdEstatusPostulacione (id);
  res.status(200).json({ Message: 'this event was delete success' });
}

module.exports = {
  httpGetAllEstatusPostulaciones ,
  httpGetByIdEstatusPostulacione ,
  httpDeleteEstatusPostulacione ,
  httpNewEstatusPostulacione ,
  httpUpdateEstatusPostulacione ,
}