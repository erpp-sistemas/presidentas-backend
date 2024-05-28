const router=require('express').Router()
const services=require('../services/documentsInters.services')
const manageErrors = require('../toolkit/manageErrors')
const schema=require('../schemas/documentsInters.schema')
const validateSchema = require('../toolkit/validdatorSchemas')

//TODO CRUD DE DOCUMENTOS REQUERIDOS
router.get('/documents',manageErrors(services.httpGetAllDocumentosInteres))

router.post('/documents',validateSchema(schema.documentSchema),manageErrors(services.httpNewDocumentosInteres,1))

router.get('/documents/:id',manageErrors(services.httpGetByIdDocumentosInteres,1))

router.put('/documents/:id',manageErrors(services.httpUpdateDocumentosInteres,1))

router.delete('/documents/:id',manageErrors(services.httpDeleteDocumentosInteres,1))

module.exports=router



