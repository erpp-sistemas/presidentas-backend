const router=require('express').Router()
const services=require('../services/auth.services')
const schema=require('../schemas/auth.schema')
const validateSchema  = require('../toolkit/validdatorSchemas')
const manageErrors = require('../toolkit/manageErrors')


//? //////////////////////////////////////////////////////////////////////  
//TODO AUTH
router.post('/createCode',manageErrors(services.httpCreateCode,0))

router.post('/register',validateSchema(schema.registerSchema),manageErrors(services.httpRegister,1))

router.post('/registerAuth',validateSchema(schema.registerSchema),manageErrors(services.httpRegisterAutenticar,1))

router.post('/login',validateSchema(schema.loginSchema),manageErrors(services.httpLogin,0))

router.post('/logout',manageErrors(services.httpLogauth))






module.exports=router




















