const router=require('express').Router()

const services=require('../services/postulacionesConvocatorias.serivces')
const manageErrors = require('../toolkit/manageErrors')
const schema=require('../schemas/postulacionesConvocatorias.schema')
const validateSchema = require('../toolkit/validdatorSchemas')

//TODO CRUD DE POSTULACIONESCONVOCATORIAS

router.get('/postulacionesConvocatorias/:convocatoria',manageErrors(services.httpGetAllPostulacionesConvocatorias,0))

router.post('/postulacionesConvocatorias',validateSchema(schema.postulacionesConvocatoriaSchema),manageErrors(services.httpNewPostulacionesConvocatoria,0))

router.get('/postulacionesConvocatorias/:convocatoria/:user',manageErrors(services.httpGetByIdPostulacionesConvocatoria,0))
router.get('/postulacionesConvocatorias/all/:convocatoria/:user',manageErrors(services.httpGetByIdPostulacionesConvocatoriaAllInfo,0))

router.put('/postulacionesConvocatorias/:id',manageErrors(services.httpUpdatePostulacionesConvocatoria,1))

router.delete('/postulacionesConvocatorias/:id',manageErrors(services.httpDeletePostulacionesConvocatoria,1))

module.exports=router