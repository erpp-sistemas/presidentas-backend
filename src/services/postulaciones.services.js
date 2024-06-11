const c = require('../controllers/postulaciones.controllers');
const { validateToken } = require('../toolkit/jwtToken');


const httpGetAllPostulaciones = async (req, res) => {
    const token=req.headers.authorization
    const daraToken= validateToken(token)
  const postulaciones = await c.getAllPostulaciones(daraToken.id);
  res.status(200).json({ postulaciones });
}

const httpGetEstaPostulado = async (req, res) => {
  const user = req.params.user;
  const convocatoria = req.params.convocatoria;
  const postulacionesConvocatoria = await c.estaPostulado(user,convocatoria);
  res.status(200).json({ postulacionesConvocatoria });
}

const httpGetPostulacionesByConvocatoria= async (req, res) => {
  const convocatoria = req.params.convocatoria;
  const postulacionesConvocatoria = await c.getALlpostualcionesByConvocatoria(convocatoria);
  res.status(200).json({ postulacionesConvocatoria });
}

const httpGetByIdPostulacione = async (req, res) => {

  const id = req.params.id;
  const postulacione = await c.getByIdPostulacione(id);
  res.status(200).json({ postulacione });
}

const httpNewPostulacione = async (req, res) => {

  const data = req.body;
  const token=req.headers.authorization
  const daraToken= validateToken(token)
  const postulacione = await c.newPostulacione(data,daraToken.id);
  res.status(201).json({ postulacione });
}

const httpUpdatePostulacione = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const postulacione = await c.updateByIdPostulacione(data, id);
  res.status(200).json({ postulacione });
}

const httpDeletePostulacione = async (req, res) => {
  const id = req.params.id;
  const postulacione = await c.deleteByIdPostulacione (id);
  res.status(200).json({ Message: 'this event was delete success' });
}

module.exports = {
  httpGetAllPostulaciones ,
  httpGetByIdPostulacione ,
  httpDeletePostulacione ,
  httpNewPostulacione ,
  httpUpdatePostulacione ,
  httpGetEstaPostulado,
  httpGetPostulacionesByConvocatoria
}