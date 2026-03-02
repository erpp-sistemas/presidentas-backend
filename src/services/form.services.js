const c = require("../controllers/forms.controller")

const httpPostForms = async (req, res) => {
    try {
        const data = req.body;
        const resp = await c.createForm(data);

        res.status(201).json(resp);

    } catch (error) {
        res.status(500).json({
            message: error.original?.message || error.message
        });
    }
};

const httpGetForms = async (req, res) => {
    try {
        const resp = await c.getForms();
        //console.log(resp)
        res.status(201).json(resp)
    } catch (error) {
        res.status(500).json({
            message: error.original?.message || error.message
        });
    }
}

const httpGetFormById = async (req, res) => {
    try {
        const { id } = req.params;
        const resp = await c.getFormById(id);
        console.log("Resp: ", resp)
        res.status(201).json(resp)
    } catch (error) {
        res.status(500).json({
            message: error.original?.message || error.message
        });
    }
}

const httpPostFormSubmit = async (req, res) => {
    try {
        const { form_id, answers, user_id } = req.body;

        const submission = await c.submitForm({
            form_id,
            answers,
            user_id: user_id || null,
            ip_address: req.ip,
        });

        res.status(201).json({
            message: "Formulario enviado correctamente",
            submission_id: submission.id,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al enviar formulario",
        });
    }
};


module.exports = {
    httpPostForms,
    httpGetForms,
    httpGetFormById,
    httpPostFormSubmit
}