const c = require("../controllers/dashboard.controller");

const httpGetDashboardMetrics = async (req, res) => {
    try {
        console.log(req.query)
        const { startDate, endDate } = req.query;
        const data = await c.getDashboardMetrics(startDate, endDate);
        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {
        console.error("Dashboard Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Error obteniendo métricas del dashboard"
        });
    }
}


module.exports = {
    httpGetDashboardMetrics
}