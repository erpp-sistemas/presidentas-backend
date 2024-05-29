const c = require('../controllers/postulacionesConvocatorias.controllers');


const httpGetAllPostulacionesConvocatorias = async (req, res) => {
  const postulacionesConvocatorias = await c.getAllPostulacionesConvocatorias();
  res.status(200).json({ postulacionesConvocatorias });
}

const httpGetByIdPostulacionesConvocatoria = async (req, res) => {
  const user = req.params.user;
  const convocatoria = req.params.convocatoria;
  const postulacionesConvocatoria = await c.getByIdPostulacionesConvocatoria(user,convocatoria);
  res.status(200).json({ postulacionesConvocatoria });
}

const httpNewPostulacionesConvocatoria = async (req, res) => {
  const data = req.body;
  const postulacionesConvocatoria = await c.newPostulacionesConvocatoria(data);
  res.status(201).json({ postulacionesConvocatoria });
}

const httpUpdatePostulacionesConvocatoria = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const postulacionesConvocatoria = await c.updateByIdPostulacionesConvocatoria(data, id);
  res.status(200).json({ postulacionesConvocatoria });
}

const httpDeletePostulacionesConvocatoria = async (req, res) => {
  const id = req.params.id;
  const postulacionesConvocatoria = await c.deleteByIdPostulacionesConvocatoria (id);
  res.status(200).json({ Message: 'this event was delete success' });
}

module.exports = {
  httpGetAllPostulacionesConvocatorias ,
  httpGetByIdPostulacionesConvocatoria ,
  httpDeletePostulacionesConvocatoria ,
  httpNewPostulacionesConvocatoria ,
  httpUpdatePostulacionesConvocatoria ,
}