

const sequelize = require("../config/dbConfig");
const { Op } = require("sequelize");
const Forms = require("../models/forms.model");
const FormFields = require("../models/form_fields.model");
const formSubmissionsModel = require("../models/form_submissions.model");
const formSubmissionValuesModel = require("../models/form_submission_values.model");
const usersModel = require("../models/users.model");


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
      order: [
        [
          { model: require("../models/form_fields.model"), as: "fields" },
          "order_index",
          "ASC",
        ],
      ],
    });

    if (!form) {
      return null;
    }

    return form;

  } catch (error) {
    throw error; // 👈 que el controller maneje el error
  }
};


exports.submitForm = async ({ form_id, answers, user_id, ip_address }) => {
  const t = await sequelize.transaction();

  try {

    const fields = await FormFields.findAll({
      where: { form_id: form_id }
    });

    const errors = validateAnswers(answers, fields);

    if (errors.length > 0) {
      return {
        success: false,
        errors
      };
    }

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


function validateAnswers(answers, fields) {

  const errors = [];

  const fieldMap = {};
  fields.forEach(field => {
    fieldMap[field.name] = field;
  });

  // 1️⃣ Validar campos obligatorios
  fields.forEach(field => {
    if (field.required) {
      if (!answers[field.name] || answers[field.name].toString().trim() === "") {
        errors.push(`${field.label} es obligatorio`);
      }
    }
  });

  // 2️⃣ Validar que no envíen campos inexistentes
  Object.keys(answers).forEach(key => {
    if (!fieldMap[key]) {
      errors.push(`El campo ${key} no pertenece al formulario`);
    }
  });

  // 3️⃣ Validar tipos
  Object.entries(answers).forEach(([key, value]) => {
    const field = fieldMap[key];
    if (!field) return;

    switch (field.type) {

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors.push(`${field.label} no es un email válido`);
        }
        break;

      case "number":
        if (isNaN(value)) {
          errors.push(`${field.label} debe ser numérico`);
        }
        break;

      case "date":
        if (isNaN(Date.parse(value))) {
          errors.push(`${field.label} no es una fecha válida`);
        }
        break;

      case "select":
        if (field.options && !field.options.includes(value)) {
          errors.push(`${field.label} tiene una opción inválida`);
        }
        break;

    }
  });

  return errors;
}


// controllers/forms.controller.js

exports.getFormSubmissions = async (id, page, limit, search) => {
  try {
    const offset = (page - 1) * limit;

    const { count, rows } = await formSubmissionsModel.findAndCountAll({
      distinct: true,
      where: {
        form_id: id
      },
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [["created_at", "DESC"]],

      include: [
        {
          model: usersModel,
          as: "user",
          attributes: ["nombre", "apellidop", "correo"],
          where: search
            ? {
              [Op.or]: [
                { nombre: { [Op.like]: `%${search}%` } },
                { apellidop: { [Op.like]: `%${search}%` } }
              ]
            }
            : undefined,
          required: search ? true : false
        },
        {
          model: formSubmissionValuesModel,
          as: "values",
          required: false, // 🔥 SIEMPRE false
          include: [
            {
              model: FormFields,
              as: "field"
            }
          ]
        }
      ]
    });

    return {
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
      data: rows
    };

  } catch (error) {
    console.error(error);
    return { error: "Error fetching submissions" };
  }
};