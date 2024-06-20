const c=require('../controllers/users.controllers')
const { validateToken } = require('../toolkit/jwtToken')

//? //////////////
const httpGetAllUsers=async(req,res)=>{
    const users= await c.getAllUsuers([1,2])
    res.status(200).json({users})
}
//? //////////////
const httpGetAllEmpadronados=async(req,res)=>{
    const users= await c.getAllUsuers([3])
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
      
        if(token&&daraToken.id){
            const user=await c.getUserById(daraToken.id)
            res.status(200).json({user})
        }else{
            res.status(404).json({message:"you are not have login"})
        }
}

//? //////////////

const httpGetMeAllFiles=async(req,res)=>{
    const token=req.headers.authorization
    const file=req.params.id
        const daraToken=validateToken(token)
      
                const  files=await c.getAllFileUser(daraToken.id,file)
            
            res.status(200).json({files})
        
}

//? //////////////

const httpGetMeFiles=async(req,res)=>{
    const token=req.headers.authorization
    const file=req.params.id
        const daraToken=validateToken(token)
     
        if(token&&daraToken.id){
           
                const  files=await c.getFileById(daraToken.id,file)
            
            res.status(200).json({files})
        }else{
            res.status(404).json({message:"you are not have login"})
        }
}

//? //////////////

const httpGetFilesByUser=async(req,res)=>{
    const id=req.params.id
    const file=req.params.file
    
        const  files=await c.getFileById(id,file)

            res.status(200).json({files})
      
}
//? //////////////

const httpGetAllFilesByUser=async(req,res)=>{
    const user=req.params.id
        const  files=await c.getAllFileByUser(user)

            res.status(200).json({files})
      
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
    console.log(id)
        const user=await c.getUserById(id)
        res.status(200).json({user})
}

//? //////////////
const httpGetUserByCurp=async(req,res)=>{
    const curp=req.params.curp
        const user=await c.getUserByCurp(curp)
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

const httpNewFile=async(req,res)=>{
    const data=req.body
        const file= await c.newFile(data)
        res.status(201).json({file})

}

//? //////////////

const httpNewFileMe=async(req,res)=>{
    const data=req.body
    const token=req.headers.authorization
        const daraToken= validateToken(token)
        const file= await c.newFile({...data,userId:daraToken.id})
        res.status(201).json({file})

}

//? //////////////

const httpNewFileUser=async(req,res)=>{
    const data=req.body
        const file= await c.newFile(data)
        res.status(201).json({file})

}

//? //////////////


module.exports={
    httpGetAllUsers,
    httpGetAllUsersAdmins,
    httpGetMe,
    httpEditMe,
    httpGetUserById,
    httpEditUserById,
    httpNewFile,
    httpGetMeFiles,
    httpGetMeAllFiles,
    httpNewFileMe,
    httpGetFilesByUser,
    httpNewFileUser,
    httpGetUserByCurp,
    httpGetAllFilesByUser,
    httpGetAllEmpadronados
}

