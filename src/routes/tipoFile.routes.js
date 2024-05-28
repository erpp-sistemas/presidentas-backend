const router=require('express').Router()

const services=require('../services/tipoFile.services')
const manageErrors = require('../toolkit/manageErrors')
const schema=require('../schemas/tipoFile.schema')
const validateSchema = require('../toolkit/validdatorSchemas')

//TODO CRUD DE TIPOFILES

router.get('/tipoFiles',manageErrors(services.httpGetAllTipoFiles))

router.post('/tipoFiles',validateSchema(schema.tipoFilesChema),manageErrors(services.httpNewTipoFile,1))

router.get('/tipoFiles/:id',manageErrors(services.httpGetByIdTipoFile,1))

router.put('/tipoFiles/:id',manageErrors(services.httpUpdateTipoFile,1))

router.delete('/tipoFiles/:id',manageErrors(services.httpDeleteTipoFile,1))

module.exports=router