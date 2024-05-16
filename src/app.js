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


//? /////////////////////////////////////////////////////////////////////
//*CORS

app.use(cors()) 
//? /////////////////////////////////////////////////////////////////////

app.use(express.json());

app.use('/embajadoras/api', routesAuth);
app.use('/embajadoras/api', routesUser);
app.use('/embajadoras/api', routesInitiatives);
app.use('/embajadoras/api', routesDocumentsInteres);
app.use('/embajadoras/api', routesEventos);



module.exports = app;
