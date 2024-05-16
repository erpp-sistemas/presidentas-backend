const uuid  = require('uuid')
const usersModel=require('../models/users.model')
const bcrypt=require('bcryptjs')
const {createAccessToken} = require('../toolkit/jwtToken')
const codigoModel = require('../models/codigo.model')
const fileModel = require('../models/file.model')
const main = require('../toolkit/sendEmail')

//? //////////////

const login=async (data)=>{

    const user= await usersModel.findOne(
        {where:{correo:data.correo},
        include: [{
            model:fileModel,
            where:{fileId:"1"},
            required: false
        }] 
    });
    
 
    const password=user?await bcrypt.compare(data.contrasena,user?.contrasena):false
  
    const messages=[
        "Error al autenticar, vuelva a intentar",
        "Este usuario no existe"
    ]
    
    if(user&&password){

        const token= await createAccessToken(user.dataValues)
         return {user,token}

    }else{
        throw {message:messages[!user&&1||!password&&0],status:!user&&404||!password&&400}
    }
      
    
}

//? //////////////


const createCode=async(data)=>{
    console.log(data)
    const existeTell= await codigoModel.findOne({where:{tell:data.tell}})
    if(!existeTell){
        const code=await codigoModel.create({tell:data.tell,codigo:"1234"})
         main.codeMail(data)
        return 201
    }else{
        const code=await codigoModel.update({codigo:"1234"},{where:{tell:data.tell}})
         main.codeMail(data)
        return 201
    }
   
}

//? //////////////
const verificationTell=async(tellID,token)=>{
    const tell= await codigoModel.findOne({where:{tell:tellID}})

    if(tell&&token==tell.codigo){
        return true
    }else{
        throw {message:"El código de autenticación no coincide"}
    }

}


const registerAutenticar=async(data)=>{
    const verificado= await verificationTell(data.tell,data.codigo)
    if(verificado){
        const id=uuid.v4()
        const tell= await usersModel.findOne({where:{tell:data.tell}})
        const correo= await usersModel.findOne({where:{correo:data.correo}})
    
        const messages=[
            "this tell already exists",
            "this email already exists"
        ]
    
        if(!tell&&!correo){
            const passHasheo=await bcrypt.hash(data.contrasena,10)
            const user=await usersModel.create({id,...data,contrasena:passHasheo,rol:2})
             main.main({...user.dataValues,password:data.contrasena})

            return user
        }else{
            throw {message:messages[correo&&1||tell&&0]}
        }
    }
}

const register=async(data)=>{
   
        const id=uuid.v4()
        const tell= await usersModel.findOne({where:{tell:data.tell}})
        const correo= await usersModel.findOne({where:{correo:data.correo}})
    
        const messages=[
            "this tell already exists",
            "this email already exists"
        ]
    
        if(!tell&&!correo){
            const passHasheo=await bcrypt.hash(data.contrasena,10)
            const user=await usersModel.create({id,...data,contrasena:passHasheo,rol:2})
            main({...user.dataValues,password:data.contrasena})

            return user
        }else{
            throw {message:messages[correo&&1||tell&&0]}
        }
    
}

//? //////////////

const emailExist=async(email)=>{
    const emailSearch=await usersModel.findOne({where:{correo:email},attributes: ['correo']})
    if(emailSearch){
        throw {message:"this email exist"}
    }
    return 200
}

//? //////////////

module.exports={
    login,
    register,
    registerAutenticar,
    createCode,emailExist
}








