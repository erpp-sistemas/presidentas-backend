const router=require('express').Router()
const services=require('../services/users.services')
const manageErrors = require('../toolkit/manageErrors')

//? //////////////////////////////////////////////////////////////////////
//TODO USERS
//* Obtiene todos los usuarios solo puede acceder un administrativo
router.get("/users",manageErrors(services.httpGetAllUsers,1))

//* Obtiene todos los administrativos solo puede acceder un administrativo
router.get("/users/admin",manageErrors(services.httpGetAllUsersAdmins,1))

//* Obtiene todos los archivos del usuario
router.get("/users/me/files",manageErrors(services.httpGetMeAllFiles))

//*Obtiene un archivo por id que pertenece al usuario
router.get("/users/me/files/:id",manageErrors(services.httpGetMeFiles))

//*Sube un archivo nuevo a nombre del usuario
router.post("/users/me/files",manageErrors(services.httpNewFileMe))

//!Obtiene un archivo de un usario en espesifico
router.get("/users/files/:id",manageErrors(services.httpGetMeFiles,1))

//!Obtiene todos los archivos por su tipo
router.get("/users/fileByID/:id",manageErrors(services.httpGetMeFiles,1))

//!Obtiene un archivo de un usario en espesifico
router.post("/users/file",manageErrors(services.httpNewFile,1))

//*Obtiene la informacion del usuario
router.get("/users/me",manageErrors(services.httpGetMe))

//*edita la informacion del usuario
router.put("/users/me",manageErrors(services.httpEditMe))

//*edita la informacion de un usario por id
router.put("/users/:id",manageErrors(services.httpEditUserById,1))

//* Obtiene la informacion de un usuario por id
router.get("/users/:id",manageErrors(services.httpGetUserById,1))


module.exports=router

















