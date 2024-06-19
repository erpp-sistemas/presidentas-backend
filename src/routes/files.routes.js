const router=require('express').Router()

const services=require('../services/files.services')
const manageErrors = require('../toolkit/manageErrors')
const schema=require('../schemas/files.schema')
const validateSchema = require('../toolkit/validdatorSchemas')

//TODO CRUD DE FILES

router.get('/files',manageErrors(services.httpGetAllFiles))

router.post('/files',validateSchema(schema.filesSchemaNuevo),manageErrors(services.httpNewFile,1))

router.post('/files/proxy',manageErrors(services.httpProxi))

router.get('/files/:id',manageErrors(services.httpGetByIdFile,1))

router.put('/files/:id',manageErrors(services.httpUpdateFile,1))

router.delete('/files/:id',manageErrors(services.httpDeleteFile,1))



module.exports=router