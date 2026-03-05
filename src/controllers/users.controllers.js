const { Op, Sequelize } = require("sequelize")
const userModel = require("../models/users.model")
const fileModel = require("../models/file.model")
const keyFilesModel = require("../models/keys.model")
const main = require("../toolkit/sendEmail")
const tipoRegistroModel = require("../models/tipoRegistro.Model")
const asistenciaEventoModel = require("../models/asistenciaEvento.model")
const userMunicipioModel = require("../models/user_municipio.model")
const redesSocialesModel = require("../models/redes_sociales.model")
const municipioModel = require("../models/municipio.model");
const sequelize = require("../config/dbConfig");
const bcrypt = require('bcryptjs')
const uuid = require('uuid')



//? //////////////
const getAllUsuers = async (tipeRegistro) => {

    const users = await userModel.findAll({
        where: {
            rol: 2
        },
        attributes: {
            exclude: ["contrasena"],
            include: [
                [Sequelize.literal("CONCAT(nombre, ' ', apellidop, ' ', apellidom)"), 'nombre_completo']
            ]
        },
        include: [
            {
                model: tipoRegistroModel,
                where: { id_tipo: tipeRegistro },
                required: true,
            },
            {
                model: fileModel,
                where: { fileId: "1" },
                required: false
            },
            {
                model: asistenciaEventoModel,
                required: false,
                attributes: { exclude: ["descripcion", "activo", "posicion"] }
            }
        ]
    });

    return users
}

//? //////////////
const getAllAdmins = async () => {
    const users = await userModel.findAll({ where: { rol: { [Op.not]: 2 } } })
    return users
}

//? //////////////
const getUserById = async (id) => {
    const user = await userModel.findOne({
        where: { id },
        include: [{
            model: fileModel,
            where: { fileId: "1" },
            required: false
        }]
    });
    return user
}
//? //////////////
const getUserByCurp = async (curp) => {
    const user = await userModel.findOne({
        where: { curp },
        include: [{
            model: fileModel,
            required: false
        }]
    });
    return user
}

//? //////////////

const getFileById = async (userId, id) => {
    const user = await fileModel.findOne({ where: { fileId: id, userId } })
    return user
}

const getAllFileUser = async (userId) => {
    const user = await keyFilesModel.findAll({
        where: { activo: 1 },
        attributes: ["nombre_file", "id", "descripcion"],
    })

    return user
}

//? //////////////
const updateUserById = async (id, data) => {

    const tell = await userModel.findOne({ where: { tell: data.tell } })
    const correo = await userModel.findOne({ where: { correo: data.correo } })

    const candado1 = (id == tell?.dataValues?.id || !tell)
    const candado2 = (id == correo?.dataValues?.id || !correo)

    const messages = [
        "this tell already exists",
        "this email already exists"
    ]

    if (candado1 && candado2) {

        const user = await userModel.update(data, { where: { id } })
        return user

    } else {
        throw { message: messages[!candado2 && 1 || !candado1 && 0] }
    }

}

//? //////////////

const newFile = async (data) => {
    const existeFIle = await fileModel.findOne({ where: { userId: data.userId, fileId: data.fileId } })
    if (existeFIle) {
        await fileModel.destroy({ where: { userId: data.userId, fileId: data.fileId } })
    }
    const file = await fileModel.create(data)
    return file
}


const getInfoCoordinadora = async (municipioId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const coordinadora = await userMunicipioModel.findOne({
                where: {
                    id_municipio: municipioId
                },
                include: [
                    {
                        model: userModel,
                        as: "usuario",
                        where: {
                            rol: 3
                        },
                        attributes: [
                            "id",
                            "nombre",
                            "apellidop",
                            "apellidom",
                            "correo",
                            "tell"
                        ],
                        include: [
                            {
                                model: redesSocialesModel,
                                as: "redes",
                                attributes: ["facebook", "instagram", "tiktok"]
                            }
                        ]
                    },
                    {
                        model: municipioModel,
                        as: "municipio",
                        attributes: ["nombre"]
                    }
                ]
            });

            if (!coordinadora) {
                resolve([])
            }

            const file_image = await fileModel.findOne({
                where: {
                    userId: coordinadora.usuario.id
                }
            })

            let photo = null
            if (file_image && file_image.dataValues && file_image.dataValues.urlFile != null) {
                photo = file_image.dataValues.urlFile
            } else {
                photo = 'https://img.freepik.com/vector-gratis/mujer-sonriente-cabello-trenzado_1308-175650.jpg?semt=ais_rp_progressive&w=740&q=80'
            }

            const response = {
                id: coordinadora.usuario.id,
                nombre: coordinadora.usuario.nombre,
                apellidop: coordinadora.usuario.apellidop,
                apellidom: coordinadora.usuario.apellidom,
                correo: coordinadora.usuario.correo,
                tell: coordinadora.usuario.tell,
                photo: photo,
                municipio: coordinadora.municipio.nombre,
                facebook: coordinadora.usuario.redes?.facebook,
                instagram: coordinadora.usuario.redes?.instagram,
                tiktok: coordinadora.usuario.redes?.tiktok
            }

            resolve(response);
        } catch (error) {
            console.error(error)
            reject({ error: "Error al obtener coordinadora" })
        }
    })

}




const getAllCoordinadoras = async (page = 1, limit = 10, search = "") => {
    const offset = (page - 1) * limit;
    const { count, rows } = await userModel.findAndCountAll({
        where: {
            rol: 3,
            [Op.or]: [
                { nombre: { [Op.like]: `%${search}%` } },
                { apellidop: { [Op.like]: `%${search}%` } },
                { correo: { [Op.like]: `%${search}%` } }
            ]
        },
        include: [
            {
                model: redesSocialesModel,
                as: "redes"
            },
            {
                model: userMunicipioModel,
                as: "municipioRelacion",
                include: [
                    {
                        model: municipioModel,
                        as: "municipio",
                    }
                ]
            },
            {
                model: fileModel
            }
        ],
        offset,
        limit,
        distinct: true
    });

    return {
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        data: rows
    };
};



const createCoordinator = async (data) => {
    const t = await sequelize.transaction();
    console.log(data)
    try {
        const {
            nombre,
            apellidop,
            apellidom,
            correo,
            contrasena,
            tell,
            fecha_nacimiento,
            calle,
            numero_ext,
            colonia,
            municipio_id,
            redes_sociales // 👈 arreglo de redes
        } = data;

        // 🔎 Validar correo único
        const existingUser = await userModel.findOne({
            where: { correo }
        });

        if (existingUser) {
            await t.rollback();
            return {
                success: false,
                message: "El correo ya está registrado"
            };
        }

        // 🔐 Hash contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // 👤 Crear usuario (rol 3 = coordinadora)
        const newUser = await userModel.create({
            id: uuid.v4(),
            nombre,
            apellidop,
            apellidom,
            correo,
            contrasena: hashedPassword,
            tell,
            fecha_nacimiento,
            calle,
            numeroExt: numero_ext,
            colonia,
            rol: 3
        }, { transaction: t });

        // 🏙 Asignar municipio
        await userMunicipioModel.create({
            id_user: newUser.id,
            id_municipio: municipio_id
        }, { transaction: t });

        // 🌐 Insertar redes sociales (si existen)
        if (Array.isArray(redes_sociales) && redes_sociales.length > 0) {

            const redesObj = {
                id_user: newUser.id,
                facebook: null,
                instagram: null,
                tiktok: null
            };

            redes_sociales.forEach(r => {
                if (r.tipo === "facebook") redesObj.facebook = r.url;
                if (r.tipo === "instagram") redesObj.instagram = r.url;
                if (r.tipo === "tiktok") redesObj.tiktok = r.url;
            });

            await redesSocialesModel.create(redesObj, { transaction: t });
        }

        await t.commit();

        return {
            success: true,
            userId: newUser.id,
            message: "Coordinadora creada correctamente"
        };

    } catch (error) {
        await t.rollback();
        console.error("Error createCoordinator:", error);
        return {
            success: false,
            userId: null,
            message: "Error al crear coordinadora"
        };
    }
};





module.exports = {
    getAllAdmins,
    getAllUsuers,
    updateUserById,
    getUserById,
    newFile,
    getAllFileUser,
    getFileById,
    getUserByCurp,
    getInfoCoordinadora,
    getAllCoordinadoras,
    createCoordinator
}




















