const { Op } = require("sequelize")
const userModel = require("../models/users.model")


//? //////////////
const getAllUsuers=async()=>{
    const users=await userModel.findAll({where:{rol:2},attributes:{exclude:["contrasena"]}})
    return users
}

//? //////////////
const getAllAdmins=async()=>{
    const users=await userModel.findAll({where:{rol:{[Op.not]:2}}})
    return users
}

//? //////////////
const getUserById=async(id)=>{
    const user=await userModel.findOne({where:{id}})

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







module.exports={
    getAllAdmins,
    getAllUsuers,
    updateUserById,
    getUserById
}




















