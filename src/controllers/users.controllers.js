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

            const photo = file_image.dataValues.urlFile

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



module.exports = {
    getAllAdmins,
    getAllUsuers,
    updateUserById,
    getUserById,
    newFile,
    getAllFileUser,
    getFileById,
    getUserByCurp,
    getInfoCoordinadora

}




















