const router=require('express').Router()

const services=require('../services/categoriaConvocatoria.serivces')
const manageErrors = require('../toolkit/manageErrors')
const schema=require('../schemas/convocatorias.schema')
const validateSchema = require('../toolkit/validdatorSchemas')

//TODO CRUD DE CATEGORIACONVOCATORIAS

router.get('/categoriaConvocatorias',manageErrors(services.httpGetAllCategoriaConvocatorias))

router.post('/categoriaConvocatorias',validateSchema(schema.categoriaSchema),manageErrors(services.httpNewCategoriaConvocatoria,1))

router.get('/categoriaConvocatorias/:id',manageErrors(services.httpGetByIdCategoriaConvocatoria))

router.put('/categoriaConvocatorias/:id',manageErrors(services.httpUpdateCategoriaConvocatoria,1))

router.delete('/categoriaConvocatorias/:id',manageErrors(services.httpDeleteCategoriaConvocatoria,1))

module.exports=router