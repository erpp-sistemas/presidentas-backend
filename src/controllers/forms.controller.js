

const sequelize = require("../config/dbConfig");
const Forms = require("../models/forms.model");
const FormFields = require("../models/form_fields.model");
const formSubmissionsModel = require("../models/form_submissions.model");
const formSubmissionValuesModel = require("../models/form_submission_values.model");

exports.createForm = async (data) => {
  const transaction = await sequelize.transaction();

  try {
    const { nombre, descripcion, created_by, fields } = data;

    const form = await Forms.create(
      { nombre, descripcion, created_by },
      { transaction }
    );

    if (fields && fields.length > 0) {
      const fieldsToInsert = fields.map((field, index) => ({
        label: field.label,
        name: field.name,
        type: field.type,
        required: field.required ? true : false,
        placeholder: field.placeholder || null,
        form_id: form.id,
        order_index: index,

        // 👇 IMPORTANTE: mandar array directamente
        options:
          field.type === "select" && field.options?.length > 0
            ? field.options
            : null,
      }));

      await FormFields.bulkCreate(fieldsToInsert, { transaction });
    }

    await transaction.commit();
    return form;

  } catch (error) {
    if (transaction.finished !== "commit") {
      await transaction.rollback();
    }

    console.error("ERROR REAL:", error.original || error);
    throw error;
  }
};



exports.getForms = async () => {
  try {
    const forms = await Forms.findAll({
      where: { activo: true },
      order: [["id", "DESC"]],
    });

    return forms
  } catch (error) {
    throw error;
  }
};


exports.getFormById = async (id) => {
  try {

    const form = await Forms.findByPk(id, {
      include: {
        model: require("../models/form_fields.model"),
        as: "fields",
      },
      order: [[{ model: require("../models/form_fields.model"), as: "fields" }, "order_index", "ASC"]],
    });

    if (!form) {
      return res.status(404).json({ message: "Formulario no encontrado" });
    }

    return form

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.submitForm = async ({ form_id, answers, user_id, ip_address }) => {
  const t = await sequelize.transaction();

  try {

    const submission = await formSubmissionsModel.create({
      form_id: form_id,
      user_id: user_id,
      ip_address: ip_address
    }, { transaction: t });

    for (const [fieldName, value] of Object.entries(answers)) {
      const field = await FormFields.findOne({
        where: { name: fieldName },
        transaction: t
      });

      if (!field) continue;

      await formSubmissionValuesModel.create({
        submission_id: submission.id,
        field_id: field.id,
        value: value
      }, { transaction: t });
    }

    await t.commit();
    return { success: true };

  } catch (error) {
    console.error(error);
    await t.rollback();
    return { error: "Error saving form" };
  }
};