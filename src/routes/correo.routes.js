const router=require('express').Router()
const services=require('../services/correo.services')
const manageErrors = require('../toolkit/manageErrors')
const schema=require('../schemas/correo.schema')
const validateSchema = require('../toolkit/validdatorSchemas')

//TODO CRUD DE INICIATIVAS
router.get('/correos',manageErrors(services.httpGetAllCorreos))

// router.post('/correos',validateSchema(schema.correosSchema),manageErrors(services.httpNewCorreos,1))

router.get('/correos/:id',manageErrors(services.httpGetByIdCorreos,1))

router.put('/correos/:id',validateSchema(schema.correoSchema), manageErrors(services.httpUpdateCorreos,1))

router.put('/correos/activo/:id',manageErrors(services.httpUpdateActivoCorreos,1))

router.post('/correos/test',manageErrors(services.httpDeleteCorreos,1))


module.exports=router



