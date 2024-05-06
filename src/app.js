const express = require("express");
const cors=require('cors')


const app = express();

//? //////////////////////////////////////////////////////////////////////
//* RUTAS
const routesAuth = require("./routes/auth.routes");
const routesUser = require("./routes/users.routes");

//? /////////////////////////////////////////////////////////////////////
//*CORS

app.use(cors({
    origin: 'http://localhost:5173',
     credentials: true
 }));
//? /////////////////////////////////////////////////////////////////////



app.use(express.json());

app.use('/embajadoras/api', routesAuth);
app.use('/embajadoras/api', routesUser);


module.exports = app;
