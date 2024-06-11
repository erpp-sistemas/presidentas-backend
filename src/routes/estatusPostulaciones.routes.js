const router=require('express').Router()

const services=require('../services/estatusPostulaciones.services')
const manageErrors = require('../toolkit/manageErrors')


//TODO CRUD DE ESTATUSPOSTULACIONES

router.get('/estatusPostulaciones',manageErrors(services.httpGetAllEstatusPostulaciones,0))

router.post('/estatusPostulaciones',manageErrors(services.httpNewEstatusPostulacione,1))

router.get('/estatusPostulaciones/:id',manageErrors(services.httpGetByIdEstatusPostulacione,1))

router.put('/estatusPostulaciones/:id',manageErrors(services.httpUpdateEstatusPostulacione,1))

router.delete('/estatusPostulaciones/:id',manageErrors(services.httpDeleteEstatusPostulacione,1))

module.exports=router