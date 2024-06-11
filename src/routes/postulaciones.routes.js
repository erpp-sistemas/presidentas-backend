const router=require('express').Router()

const services=require('../services/postulaciones.services')
const manageErrors = require('../toolkit/manageErrors')
const schema=require('../schemas/postulaciones.schema')
const validateSchema = require('../toolkit/validdatorSchemas')

//TODO CRUD DE POSTULACIONES

router.get('/postulaciones',manageErrors(services.httpGetAllPostulaciones,0))

router.get('/postulaciones/Byid/:id/',manageErrors(services.httpGetByIdPostulacione,0))

router.get('/postulaciones/:convocatoria/',manageErrors(services.httpGetPostulacionesByConvocatoria,0))

router.get('/postulaciones/:convocatoria/:user',manageErrors(services.httpGetEstaPostulado,0))

router.post('/postulaciones',validateSchema(schema.postulacionesSchema),manageErrors(services.httpNewPostulacione,0))

router.get('/postulaciones/:id',manageErrors(services.httpGetByIdPostulacione,0))

router.put('/postulaciones/:id',manageErrors(services.httpUpdatePostulacione,1))

router.delete('/postulaciones/:id',manageErrors(services.httpDeletePostulacione,0))

module.exports=router