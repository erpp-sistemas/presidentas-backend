const router=require('express').Router()
const services=require('../services/initiatives.serivices')
const manageErrors = require('../toolkit/manageErrors')
const schema=require('../schemas/initiatives.schema')
const validateSchema = require('../toolkit/validdatorSchemas')

//TODO CRUD DE INICIATIVAS
router.get('/initiatives',manageErrors(services.httpGetAllInitiatives))

router.post('/initiatives',validateSchema(schema.initiativeSchema),manageErrors(services.httpNewInitiatives,1))

router.get('/initiatives/:id',manageErrors(services.httpGetByIdInitiatives,1))

router.put('/initiatives/:id',manageErrors(services.httpUpdateInitiatives,1))

router.delete('/initiatives/:id',manageErrors(services.httpDeleteInitiatives,1))

module.exports=router















