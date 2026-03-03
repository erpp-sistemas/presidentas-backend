const router = require('express').Router()
const services = require("../services/dashboard.services");
const manageErrors = require("../toolkit/manageErrors")

router.get("/dashboard/metrics", manageErrors(services.httpGetDashboardMetrics, 0))

module.exports = router;