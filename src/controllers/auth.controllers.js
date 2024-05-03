const uuid  = require('uuid')
const usersModel=require('../models/users.model')
const bcrypt=require('bcryptjs')
const {createAccessToken} = require('../toolkit/jwtToken')

//? //////////////

const login=async (data)=>{

    const user= await usersModel.findOne({where:{correo:data.correo}})
 
    const password=user?await bcrypt.compare(data.contrasena,user?.contrasena):false
  
    const messages=[
        "this password is fail",
        "this user no exists"
    ]
    
    if(user&&password){

        const token= await createAccessToken(user.dataValues)
         return {user,token}

    }else{
        throw {message:messages[!user&&1||!password&&0]}
    }
      
    
}

//? //////////////

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

        return user
    }else{
        throw {message:messages[correo&&1||tell&&0]}
    }
}

//? //////////////

module.exports={
    login,
    register
}








