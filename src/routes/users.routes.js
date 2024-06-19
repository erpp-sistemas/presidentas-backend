const router=require('express').Router()
const services=require('../services/users.services')
const manageErrors = require('../toolkit/manageErrors')


//? //////////////////////////////////////////////////////////////////////
//TODO ME
//*Obtiene la informacion del usuario
router.get("/users/me",manageErrors(services.httpGetMe,0))

//*edita la informacion del usuario
router.put("/users/me",manageErrors(services.httpEditMe,0))

//? //////////////////////////////////////////////////////////////////////
//TODO USERS
//* Obtiene todos los usuarios solo puede acceder un administrativo
router.get("/users",manageErrors(services.httpGetAllUsers,1))
//* Obtiene todos los usuarios empadronados solo puede acceder un administrativo
router.get("/users/empadronados",manageErrors(services.httpGetAllUsers,1))

//* Obtiene todos los administrativos solo puede acceder un administrativo
router.get("/users/admin",manageErrors(services.httpGetAllUsersAdmins,1))

//*edita la informacion de un usario por id
router.put("/users/:id",manageErrors(services.httpEditUserById,1))

//* Obtiene la informacion de un usuario por id
router.get("/users/:id",manageErrors(services.httpGetUserById,1))

//* Obtiene la informacion de un usuario por curp
router.get("/userByCurp/:curp",manageErrors(services.httpGetUserByCurp,0))


//? //////////////////////////////////////////////////////////////////////
//TODO USERS FILES

//*Obtiene un archivo de un usario en espesifico
router.get("/users/files/:id/:file",manageErrors(services.httpGetFilesByUser,1))

//!revisar *actualiza y agrega un archivo de un usario por id
//*nota veo que lo uso en algunas partes
// router.post("/users/files/:id/:file",manageErrors(services.httpNewFileUser,0))

//*actualiza y agrega un archivo de un usario por data en body
router.post("/users/file",manageErrors(services.httpNewFileUser,0))

//? //////////////////////////////////////////////////////////////////////
//TODO ME FILES
//* Obtiene todos los archivos del usuario
router.get("/users/me/files",manageErrors(services.httpGetMeAllFiles,0))

//*Obtiene un archivo por id que pertenece al usuario
router.get("/users/me/files/:id",manageErrors(services.httpGetMeFiles,0))

//*Sube un archivo nuevo a nombre del usuario
router.post("/users/me/files",manageErrors(services.httpNewFileMe,0))

//! SIN USAR ///////////////////////////////////////////////////////////////////

//!Obtiene todos los archivos por su tipo
router.get("/users/fileByID/:id",manageErrors(services.httpGetMeFiles,1))

//!Obtiene un archivo de un usario en espesifico






module.exports=router

















