const router=require('express').Router()
const services=require('../services/users.services')
const manageErrors = require('../toolkit/manageErrors')

//? //////////////////////////////////////////////////////////////////////
//TODO USERS

router.get("/users",manageErrors(services.httpGetAllUsers,1))

router.get("/users/admin",manageErrors(services.httpGetAllUsersAdmins,1))

router.get("/users/me/files/:id",manageErrors(services.httpGetMeFiles))

router.get("/users/me/files",manageErrors(services.httpGetMeAllFiles))

router.get("/users/files/:id",manageErrors(services.httpGetMeFiles,1))

router.get("/users/fileByID/:id",manageErrors(services.httpGetMeFiles,1))

router.post("/users/file",manageErrors(services.httpNewFile,1))

router.get("/users/me",manageErrors(services.httpGetMe))

router.put("/users/me",manageErrors(services.httpEditMe))

router.put("/users/:id",manageErrors(services.httpEditUserById,1))

router.get("/users/:id",manageErrors(services.httpGetUserById,1))


module.exports=router

















