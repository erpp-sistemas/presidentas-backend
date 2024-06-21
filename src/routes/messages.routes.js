const router=require('express').Router()
const schema= require('../schemas/messages.schemas')
const services=require('../services/messages.services')
const manageErrors = require('../toolkit/manageErrors')
const validateSchema = require('../toolkit/validdatorSchemas')



//TODO CRUD DE MESSAGES
router.post('/correo',validateSchema(schema.correoSchema),manageErrors(services.httpSendEmail,1))



module.exports=router














