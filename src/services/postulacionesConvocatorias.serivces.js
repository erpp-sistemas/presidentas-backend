const c = require('../controllers/postulacionesConvocatorias.controllers');


const httpGetAllPostulacionesConvocatorias = async (req, res) => {
  const co=req.params.convocatoria;
  const postulacionesConvocatorias = await c.getAllPostulacionesConvocatorias(co);
  res.status(200).json({ postulacionesConvocatorias });
}

const httpGetByIdPostulacionesConvocatoria = async (req, res) => {
  const user = req.params.user;
  const convocatoria = req.params.convocatoria;
  const postulacionesConvocatoria = await c.getByIdPostulacionesConvocatoria(user,convocatoria);
  res.status(200).json({ postulacionesConvocatoria });
}

const httpGetByIdPostulacionesConvocatoriaAllInfo = async (req, res) => {
  const user = req.params.user;
  const convocatoria = req.params.convocatoria;
  console.log(user,convocatoria)
  const postulacionesConvocatoria = await c.getByIdPostulacionesConvocatoriaAllInfo(user,convocatoria);
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
  httpGetByIdPostulacionesConvocatoriaAllInfo
}





// SELECT [postulaciones_convocatorias].[id], [postulaciones_convocatorias].[user_id], [postulaciones_convocatorias].[convocatoria_id], [postulaciones_convocatorias].[created_at], [user].[id] AS [user.id], [user].[nombre] AS [user.nombre], [user].[apellidop] AS [user.apellidop], [user].[apellidom] AS [user.apellidom], [user].[curp] AS [user.curp], [user].[correo] AS [user.correo], [user].[contrasena] AS [user.contrasena], [user].[tell] AS [user.tell], [user].[calle] AS [user.calle], [user].[numeroExt] AS [user.numeroExt], [user].[colonia] AS [user.colonia], [user].[tell_casa] AS [user.tell_casa], [user].[fecha_nacimiento] AS [user.fecha_nacimiento], [user].[rol] AS [user.rol], [user].[nvl_academico] AS [user.nvl_academico], [user].[profesion] AS [user.profesion], [convocatoria].[id] AS [convocatoria.id], [convocatoria].[titulo_convocatoria] AS [convocatoria.titulo_convocatoria], [convocatoria].[categorias_id] AS [convocatoria.categorias_id], [convocatoria].[des_breve] AS [convocatoria.des_breve], [convocatoria].[descripcion] AS [convocatoria.descripcion], [convocatoria].[files_keys] AS [convocatoria.files_keys], [convocatoria].[fecha_limite_postulacion] AS [convocatoria.fecha_limite_postulacion], [convocatoria].[activo] AS [convocatoria.activo] FROM [postulaciones_convocatorias] AS [postulaciones_convocatorias] LEFT OUTER JOIN [users] AS [user] ON [postulaciones_convocatorias].[user_id] = [user].[id] LEFT OUTER JOIN [convocatorias] AS [convocatoria] ON [postulaciones_convocatorias].[user_id] = [convocatoria].[id] WHERE [postulaciones_convocatorias].[user_id] = N'4b3c6449-8a6c-4cde-b7ce-d4cc82d00a7d' AND [postulaciones_convocatorias].[convocatoria_id] = N'36' ORDER BY [postulaciones_convocatorias].[id] OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY