const c = require('../controllers/convocatoriasGuardadas.controller');
const { validateToken } = require('../toolkit/jwtToken');


const httpGetAllConvocatoriasGuardadas = async (req, res) => {
    const token=req.headers.authorization
    const daraToken= validateToken(token)
  const convocatoriasGuardadas = await c.getAllConvocatoriasGuardadas(daraToken.id);
  res.status(200).json({ convocatoriasGuardadas });
}

const httpGetByIdConvocatoriasGuardada = async (req, res) => {
  const id = req.params.id;
  const token=req.headers.authorization
  const daraToken= validateToken(token)
  const convocatoriasGuardada = await c.getByIdConvocatoriasGuardada(id,daraToken.id);
  res.status(200).json({ convocatoriasGuardada });
}

const httpNewConvocatoriasGuardada = async (req, res) => {
  const data = req.body;
  const token=req.headers.authorization
  const daraToken= validateToken(token)
  const convocatoriasGuardada = await c.newConvocatoriasGuardada(data,daraToken.id);
  res.status(201).json({ convocatoriasGuardada });
}

const httpUpdateConvocatoriasGuardada = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const convocatoriasGuardada = await c.updateByIdConvocatoriasGuardada(data, id);
  res.status(200).json({ convocatoriasGuardada });
}

const httpDeleteConvocatoriasGuardada = async (req, res) => {
  const id = req.params.id;
  const convocatoriasGuardada = await c.deleteByIdConvocatoriasGuardada (id);
  res.status(200).json({ Message: 'this event was delete success' });
}

// const httpDeleteConvocatoriasGuardada = async (req, res) => {
//   const id = req.params.id;
//   const convocatoriasGuardada = await c.deleteByIdConvocatoriasGuardada (id);
//   res.status(200).json({ Message: 'this event was delete success' });
// }

module.exports = {
  httpGetAllConvocatoriasGuardadas ,
  httpGetByIdConvocatoriasGuardada ,
  httpDeleteConvocatoriasGuardada ,
  httpNewConvocatoriasGuardada ,
  httpUpdateConvocatoriasGuardada ,
}