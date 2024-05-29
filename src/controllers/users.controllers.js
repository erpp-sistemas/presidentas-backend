const { Op, Sequelize } = require("sequelize")
const userModel = require("../models/users.model")
const fileModel = require("../models/file.model")
const keyFilesModel = require("../models/keys.model")
const main = require("../toolkit/sendEmail")


//? //////////////
const getAllUsuers=async()=>{
    const users=await userModel.findAll({
        where:{rol:2},
        attributes:{
                exclude:["contrasena"],
        include: [
            [Sequelize.literal("CONCAT(nombre, ' ', apellidop, ' ', apellidom)"), 'nombre_completo']
        ]
        },
        include: [{
            model:fileModel,
            where:{fileId:"1"},
            required: false,
        }]
    })

    
    return users
}

//? //////////////
const getAllAdmins=async()=>{
    const users=await userModel.findAll({where:{rol:{[Op.not]:2}}})
    return users
}

//? //////////////
const getUserById=async(id)=>{
    const user = await userModel.findOne({
        where: { id },
        include: [{
            model:fileModel,
            where:{fileId:"1"},
            required: false
        }] 
    });
    return user
}
//? //////////////
const getUserByCurp=async(curp)=>{
    const user = await userModel.findOne({
        where: { curp },
        include: [{
            model:fileModel,
            required: false
        }] 
    });
    return user
}

//? //////////////

const getFileById=async(userId,id)=>{
    const user=await fileModel.findOne({where:{fileId:id,userId}})
    return user
}

const getAllFileUser=async(userId)=>{
    const user=await keyFilesModel.findAll({
        where:{active:1},
        attributes:["nameFile","id"],
    })

    return user
}

//? //////////////
const updateUserById=async(id,data)=>{
    
    const tell= await userModel.findOne({where:{tell:data.tell}})
    const correo= await userModel.findOne({where:{correo:data.correo}})

    const candado1=(id==tell?.dataValues?.id||!tell)
    const candado2=(id==correo?.dataValues?.id||!correo)
   
    const messages=[
        "this tell already exists",
        "this email already exists"
    ]

    if(candado1&&candado2){
        
        const user=await userModel.update(data,{where:{id}})
        return user

    }else{
        throw {message:messages[!candado2&&1||!candado1&&0]}
    }
   
}

//? //////////////

const newFile=async(data)=>{
    const existeFIle=await fileModel.findOne({where:{userId:data.userId,fileId:data.fileId}})
    if(existeFIle){
        await fileModel.destroy({where:{userId:data.userId,fileId:data.fileId}})
    }
    const file=await fileModel.create(data)
    return file
}






module.exports={
    getAllAdmins,
    getAllUsuers,
    updateUserById,
    getUserById,
    newFile,
    getAllFileUser,
    getFileById,
    getUserByCurp
    
}




















