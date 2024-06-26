const express = require("express");
const cors=require('cors')
const { default: axios } = require("axios");

const app = express();

//? //////////////////////////////////////////////////////////////////////
//* RUTAS
const routesAuth = require("./routes/auth.routes");
const routesUser = require("./routes/users.routes");
const routesInitiatives = require("./routes/initiatives.routes");
const routesDocumentsInteres = require("./routes/documentsInters.routes");
const routesEventos = require("./routes/eventos.routes");
const routesCorreos = require("./routes/correo.routes");
const convocatoriasRoutes = require("./routes/convocatorias.routes");
const categoriaConvocatoriaRoutes = require("./routes/categoriaConvocatoria.routes");
const tipoFilesRoutes = require("./routes/tipoFile.routes");
const filesRoutes = require("./routes/files.routes");
const postulacionesConvocatoriasRoutes = require("./routes/postulacionesConvocatorias.routes");
const convocatoriasGuardadasRoutes = require("./routes/convocatoriasGuardadas.routes");
const postulacionesRoutes = require("./routes/postulaciones.routes");
const estatusPostulacionesRoutes = require("./routes/estatusPostulaciones.routes");
const messagesRoutes = require("./routes/messages.routes");



//? /////////////////////////////////////////////////////////////////////
//*CORS

app.use(cors({
    origin:"*",
    optionsSuccessStatus:"200"
})) 
//? /////////////////////////////////////////////////////////////////////

app.use(express.json());

app.use('/embajadoras/api', routesAuth);
app.use('/embajadoras/api', routesUser);
app.use('/embajadoras/api', routesInitiatives);
app.use('/embajadoras/api', routesDocumentsInteres);
app.use('/embajadoras/api', routesEventos);
app.use('/embajadoras/api', routesCorreos);
app.use('/embajadoras/api', convocatoriasRoutes);
app.use('/embajadoras/api', categoriaConvocatoriaRoutes);
app.use('/embajadoras/api', tipoFilesRoutes);
app.use('/embajadoras/api', filesRoutes);
app.use('/embajadoras/api', postulacionesConvocatoriasRoutes);
app.use('/embajadoras/api', convocatoriasGuardadasRoutes);
app.use('/embajadoras/api', postulacionesRoutes);
app.use('/embajadoras/api', estatusPostulacionesRoutes);
app.use('/embajadoras/api', estatusPostulacionesRoutes);
app.use('/embajadoras/api', messagesRoutes);



app.post('/embajadoras/api/fetch-pdf', async (req, res) => {
    const url  =req.body.url 

    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const pdfData = response.data;
  
      res.setHeader('Content-Disposition', `attachment; filename="cv.pdf"`);
      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdfData);
    } catch (error) {
      console.error('Error fetching PDF:', error);
      res.status(500).send('Error fetching PDF');
    }
  });


module.exports = app;
