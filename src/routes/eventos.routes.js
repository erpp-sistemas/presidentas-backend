const router=require('express').Router()
const services=require('../services/eventos.services')
const manageErrors = require('../toolkit/manageErrors')
const schema=require('../schemas/eventos.schema')
const validateSchema = require('../toolkit/validdatorSchemas')

//TODO CRUD DE INICIATIVAS
router.get('/eventos',manageErrors(services.httpGetAllEventos))

router.post('/eventos',validateSchema(schema.eventosSchema),manageErrors(services.httpNewEventos,1))

router.get('/eventos/:id',manageErrors(services.httpGetByIdEventos,1))

router.put('/eventos/:id',validateSchema(schema.eventosSchema),manageErrors(services.httpUpdateEventos,1))

router.delete('/eventos/:id',manageErrors(services.httpDeleteEventos,1))

module.exports=router



