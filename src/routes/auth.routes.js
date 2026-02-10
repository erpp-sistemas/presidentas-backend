const router = require('express').Router()
const services = require('../services/auth.services')
const schema = require('../schemas/auth.schema')
const validateSchema = require('../toolkit/validdatorSchemas')
const manageErrors = require('../toolkit/manageErrors')


//? //////////////////////////////////////////////////////////////////////  
//TODO AUTH
router.post('/createCode', manageErrors(services.httpCreateCode))

router.post('/register', validateSchema(schema.registerSchema), manageErrors(services.httpRegister))

router.post('/registerMasivo', validateSchema(schema.registerSchemaMasivo), manageErrors(services.httpRegisterMasivo, 1))

router.post('/registerAuth', validateSchema(schema.registerSchema), manageErrors(services.httpRegisterAutenticar))

router.post('/login', validateSchema(schema.loginSchema), manageErrors(services.httpLogin))

//! No se usa
router.post('/logout', manageErrors(services.httpLogauth))

router.post('/emailUnique', manageErrors(services.httpEmailUnique))

router.post('/curpUnique', manageErrors(services.httpCurpUnique))

router.post('/authCurp', manageErrors(services.httpCurpAuth))

router.post('/authCurpCode', manageErrors(services.httpCurpCodeLogin))






module.exports = router




















