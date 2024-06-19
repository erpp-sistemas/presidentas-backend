const uuid  = require('uuid')
const usersModel=require('../models/users.model')
const bcrypt=require('bcryptjs')
const {createAccessToken} = require('../toolkit/jwtToken')
const codigoModel = require('../models/codigo.model')
const fileModel = require('../models/file.model')
const main = require('../toolkit/sendEmail')
const correosModel = require('../models/correo.model')
const userMasivoModel = require('../models/userMasivo.model')
const asistenciaEventoModel = require('../models/asistenciaEvento.model')
const tipoRegistroModel = require('../models/tipoRegistro.Model')

//? //////////////

const login=async (data)=>{
 

    const user= await usersModel.findOne(
        {where:{correo:data.correo},
        include: [{
            model:fileModel,
            where:{fileId:"1"},
            required: false
        }] ,
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
    const existeTell= await codigoModel.findOne({where:{tell:data.tell}})
    if(!existeTell){
        const code=await codigoModel.create({tell:data.tell,codigo:"1234"})
        const correo=await correosModel.findOne({where:{id:1}})
         main(data,correo)
    console.log("codigo creado")

        return 201
    }else{
        const code=await codigoModel.update({codigo:"1234"},{where:{tell:data.tell}})
        const correo=await correosModel.findOne({where:{id:1}})
        main(data,correo)
    console.log("codigo creado")

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
             const correo=await correosModel.findOne({where:{id:2}})
             await tipoRegistroModel.create({id_user:id,id_tipo:1})
             main({...user.dataValues,contrasena:data.contrasena},correo)
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
            const correo=await correosModel.findOne({where:{id:2}})
            await tipoRegistroModel.create({id_user:id,id_tipo:2})
             main({...user.dataValues,contrasena:data.contrasena},correo)

            return user
        }else{
            throw {message:messages[correo&&1||tell&&0]}
        }
    
}
const registerMasivo=async(data)=>{
   
        const id=uuid.v4()
        const correo= await userMasivoModel.findOne({where:{correo:data.correo}})
        const tell= await usersModel.findOne({where:{tell:data.tell}})
        const asistencia= correo?await asistenciaEventoModel.findOne({where:{id_user:correo?.id,id_evento:data.id_evento}}):false
        
        const bodyAsistencia={
            id_user:correo?.id||null,
            fecha_asistencia:data.fecha_asistencia,
            id_evento:data.id_evento
        }
        console.log(asistencia)

        if(asistencia){
            throw {message:"This user have asistencia",status:"403"}
        }
    
        if(!correo&&!tell){
         
            const user=await userMasivoModel.create({id,...data,rol:2})
             await tipoRegistroModel.create({id_user:id,id_tipo:3})
             await asistenciaEventoModel.create({...bodyAsistencia,id_user:id})

            return user
        }else{
           
            if(!correo){
                throw {message:"This phone number does not correspond to the email",status:"405"}
            }
          
            await asistenciaEventoModel.create(bodyAsistencia)
            return 200
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
const curpUnique=async(curp)=>{
    const curpSearch=await usersModel.findOne({where:{curp},attributes: ['curp']})
    if(curpSearch){
        throw {message:"this curp exist"}
    }
    return 200
}

//? //////////////
const curpAuth=async(curp)=>{
    const curpSearch=await usersModel.findOne({where:{curp}, attributes:["curp","tell","correo"]});
    if(!curpSearch){
        throw {message:"this curp not exist"}
    }
    console.log(curpSearch)
    await createCode(curpSearch.dataValues )

    return curpSearch
}



//? //////////////
const curpCodeLogin=async(data)=>{
    const verificado= await verificationTell(data.tell,data.codigo)
    if(verificado){
        const user= await usersModel.findOne(
            {where:{correo:data.correo},
            include: [{
                model:fileModel,
                where:{fileId:"1"},
                required: false
            }] 
        });
        
    
            const token= await createAccessToken(user.dataValues)
             return {user,token}
    }{
        throw {message:"No se pudo autenticar intete de nuevo" }
    }
}



//? //////////////

module.exports={
    login,
    register,
    registerAutenticar,
    createCode,
    emailExist,
    curpUnique,
    curpAuth,
    curpCodeLogin,
    registerMasivo
}








