const router = require('express').Router()
const services = require("../services/form.services");
const manageErrors = require("../toolkit/manageErrors")



router.get("/forms", manageErrors(services.httpGetForms, 0))
router.get("/formById/:id", manageErrors(services.httpGetFormById, 0))
router.get("/forms/:id/submissions", manageErrors(services.httpGetSubmissions))
router.post("/forms", manageErrors(services.httpPostForms, 0))
router.post("/forms/submit", manageErrors(services.httpPostFormSubmit, 0))


module.exports = router;