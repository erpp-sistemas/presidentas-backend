const express = require("express");
const cors=require('cors')

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



module.exports = app;
