const FormSubmissions = require("../models/form_submissions.model");
const FormSubmissionValues = require("../models/form_submission_values.model");

exports.submitForm = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { user_id, values } = req.body;

    const submission = await FormSubmissions.create(
      {
        form_id: id,
        user_id,
        ip_address: req.ip,
      },
      { transaction }
    );

    const valuesToInsert = values.map((item) => ({
      submission_id: submission.id,
      field_id: item.field_id,
      value: item.value,
    }));

    await FormSubmissionValues.bulkCreate(valuesToInsert, { transaction });

    await transaction.commit();

    res.status(201).json({
      message: "Formulario enviado correctamente",
    });

  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};


exports.getSubmissions = async (req, res) => {
  try {
    const { id } = req.params;

    const submissions = await FormSubmissions.findAll({
      where: { form_id: id },
      include: {
        model: require("../models/form_submission_values.model"),
        as: "values",
        include: {
          model: require("../models/form_fields.model"),
        },
      },
      order: [["created_at", "DESC"]],
    });

    res.json(submissions);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};