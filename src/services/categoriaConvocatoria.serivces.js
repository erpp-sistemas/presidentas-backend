const c = require('../controllers/categoriaConvocatoria.controller');


const httpGetAllCategoriaConvocatorias = async (req, res) => {
  const categoriaConvocatorias = await c.getAllCategoriaConvocatorias();
  res.status(200).json({ categoriaConvocatorias });
}

const httpGetByIdCategoriaConvocatoria = async (req, res) => {
  const id = req.params.id;
  const categoriaConvocatoria = await c.getByIdCategoriaConvocatoria(id);
  res.status(200).json({ categoriaConvocatoria });
}

const httpNewCategoriaConvocatoria = async (req, res) => {
  const data = req.body;
  const categoriaConvocatoria = await c.newCategoriaConvocatoria(data);
  res.status(201).json({ categoriaConvocatoria });
}

const httpUpdateCategoriaConvocatoria = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const categoriaConvocatoria = await c.updateByIdCategoriaConvocatoria(data, id);
  res.status(200).json({ categoriaConvocatoria });
}

const httpDeleteCategoriaConvocatoria = async (req, res) => {
  const id = req.params.id;
  const categoriaConvocatoria = await c.deleteByIdCategoriaConvocatoria (id);
  res.status(200).json({ Message: 'this event was delete success' });
}

module.exports = {
  httpGetAllCategoriaConvocatorias ,
  httpGetByIdCategoriaConvocatoria ,
  httpDeleteCategoriaConvocatoria ,
  httpNewCategoriaConvocatoria ,
  httpUpdateCategoriaConvocatoria ,
}