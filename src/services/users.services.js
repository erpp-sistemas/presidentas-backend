const c=require('../controllers/users.controllers')
const { validateToken } = require('../toolkit/jwtToken')

//? //////////////
const httpGetAllUsers=async(req,res)=>{
    const users= await c.getAllUsuers()
    res.status(200).json({users})
}
//? //////////////
const httpGetAllUsersAdmins=async(req,res)=>{
    const users=await c.getAllAdmins()
    res.status(200).json({users})
}

//? //////////////
const httpGetMe=async(req,res)=>{
    const token=req.headers.authorization
      
        const daraToken=validateToken(token)
        console.log("Token",daraToken)
        if(token&&daraToken.id){
            const user=await c.getUserById(daraToken.id)
            res.status(200).json({user})
        }else{
            res.status(404).json({message:"you are not have login"})
        }
}

//? //////////////
const httpEditMe=async(req,res)=>{
    const data=req.body
    delete data.rol
   
    const token=req.headers.authorization
    const daraToken= validateToken(token)
    if(token&&daraToken.id){
        const user=await c.updateUserById(daraToken.id,data)
        res.status(200).json({user})
    }else{
        res.status(404).json({message:"you are not have login"})
    }
    
}

//? //////////////
const httpGetUserById=async(req,res)=>{
    const id=req.params.id
        const user=await c.getUserById(id)
        res.status(200).json({user})
}

//? //////////////
const httpEditUserById=async(req,res)=>{
    const id=req.params.id
    const data=req.body
        const user=await c.updateUserById(id,data)
        res.status(200).json({user})
}


//? //////////////


module.exports={
    httpGetAllUsers,
    httpGetAllUsersAdmins,
    httpGetMe,
    httpEditMe,
    httpGetUserById,
    httpEditUserById
}

