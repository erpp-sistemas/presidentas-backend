const router=require('express').Router()

const services=require('../services/convocatorias.services')
const manageErrors = require('../toolkit/manageErrors')
const schema=require('../schemas/convocatorias.schema')
const validateSchema = require('../toolkit/validdatorSchemas')

//TODO CRUD DE CONVOCATORIAS

router.get('/convocatorias',manageErrors(services.httpGetAllConvocatorias))

router.post('/convocatorias',validateSchema(schema.convocatoriaSchema),manageErrors(services.httpNewConvocatoria,1))

router.get('/convocatorias/:id',manageErrors(services.httpGetByIdConvocatoria,1))

router.put('/convocatorias/:id',manageErrors(services.httpUpdateConvocatoria,1))

router.delete('/convocatorias/:id',manageErrors(services.httpDeleteConvocatoria,1))

module.exports=router