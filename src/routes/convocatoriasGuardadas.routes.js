const router=require('express').Router()

const services=require('../services/convocatoriasGuardadas.services')
const manageErrors = require('../toolkit/manageErrors')
const schema=require('../schemas/convocatoriasGuardadas.schema')
const validateSchema = require('../toolkit/validdatorSchemas')

//TODO CRUD DE CONVOCATORIASGUARDADAS

router.get('/convocatoriasGuardadas',manageErrors(services.httpGetAllConvocatoriasGuardadas,0))

router.post('/convocatoriasGuardadas',validateSchema(schema.convocatoriasGuardadasSchema),manageErrors(services.httpNewConvocatoriasGuardada,0))

router.get('/convocatoriasGuardadas/:id',manageErrors(services.httpGetByIdConvocatoriasGuardada,0))

router.put('/convocatoriasGuardadas/:id',manageErrors(services.httpUpdateConvocatoriasGuardada,0))

router.delete('/convocatoriasGuardadas/:id',manageErrors(services.httpDeleteConvocatoriasGuardada,0))

// router.get('/convocatoriasGuardadas/Guardada?/:id',manageErrors(services.httpDeleteConvocatoriasGuardada,0))

module.exports=router