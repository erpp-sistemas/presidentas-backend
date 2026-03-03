const sequelize = require("../config/dbConfig");
const { Op } = require("sequelize");
const formSubmissionsModel = require("../models/form_submissions.model");
const formsModel = require("../models/forms.model");
const usersModel = require("../models/users.model");


exports.getDashboardMetrics = async (startDate, endDate) => {
    try {
        /* =============================
           🧠 WHERE DINÁMICO GLOBAL
        ============================= */

        const where = {};

        if (startDate || endDate) {

            const startUTC = startDate
                ? new Date(startDate + "T00:00:00-06:00")
                : null;

            const endUTC = endDate
                ? new Date(endDate + "T23:59:59-06:00")
                : null;

            if (startUTC && endUTC) {
                where.created_at = {
                    [Op.between]: [startUTC, endUTC]
                };
            } else if (startUTC) {
                where.created_at = {
                    [Op.gte]: startUTC
                };
            } else if (endUTC) {
                where.created_at = {
                    [Op.lte]: endUTC
                };
            }
        }

        /* =============================
           1️⃣ TOTAL REGISTROS
        ============================= */

        const totalRegistros = await formSubmissionsModel.count({
            where
        });


        /* =============================
           2️⃣ REGISTROS POR FORMULARIO
        ============================= */

        const porFormularioRaw = await formSubmissionsModel.findAll({
            attributes: [
                [sequelize.col("form.nombre"), "formulario"],
                [sequelize.fn("COUNT", sequelize.col("form_submissions.id")), "total"]
            ],
            include: [
                {
                    model: formsModel,
                    as: "form",
                    attributes: []
                }
            ],
            where,
            group: ["form.nombre"],
            order: [[sequelize.literal("total"), "DESC"]],
            raw: true
        });

        const porFormulario = porFormularioRaw.map(item => ({
            nombre: item.formulario,
            total: parseInt(item.total)
        }));


        /* =============================
           3️⃣ REGISTROS POR FECHA
        ============================= */

        const fechaMexicoLiteral = `
            FORMAT(
                SWITCHOFFSET(created_at, '-06:00'),
                'yyyy-MM-dd'
            )
        `;

        const porFechaRaw = await formSubmissionsModel.findAll({
            attributes: [
                [sequelize.literal(fechaMexicoLiteral), "fecha"],
                [sequelize.fn("COUNT", sequelize.col("id")), "total"]
            ],
            where,
            group: [sequelize.literal(fechaMexicoLiteral)],
            order: [[sequelize.literal("fecha"), "ASC"]],
            raw: true
        });


        /* =============================
           4️⃣ REGISTROS POR USUARIO
        ============================= */

        const porUsuarioRaw = await formSubmissionsModel.findAll({
            attributes: [
                [sequelize.col("user.nombre"), "usuario"],
                [sequelize.fn("COUNT", sequelize.col("form_submissions.id")), "total"]
            ],
            include: [
                {
                    model: usersModel,
                    as: "user",
                    attributes: []
                }
            ],
            where,
            group: ["user.nombre"],
            order: [[sequelize.literal("total"), "DESC"]],
            raw: true
        });

        const porUsuario = porUsuarioRaw.map(item => ({
            nombre: item.usuario,
            total: parseInt(item.total)
        }));


        /* =============================
           📦 RESPONSE FINAL
        ============================= */

        return {
            kpis: {
                totalRegistros
            },
            charts: {
                porFormulario,
                porFecha: porFechaRaw,
                porUsuario
            }
        };

    } catch (error) {
        console.error("Dashboard Service Error:", error);
        throw error;
    }
};