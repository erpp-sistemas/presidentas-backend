const { validateToken } = require("./jwtToken")


//* Maneja los permisos 
const managePermissions=(rol,token)=>{
  let candado=true
  const daraToken=validateToken(token)
 
  if(rol&&daraToken?.id){
    candado=daraToken.rol==rol;

  }
  if(daraToken==null){candado=null}

  return candado
}



const manageErrors=(functionP,rol)=>async(req,res)=>{
  const token=req.headers.authorization
  const havePermissions=managePermissions(rol,token)

  console.log(">>>>>>>>>>>>>>> Ruta autorizada :",havePermissions)

  if(havePermissions==null&&rol!=0){return res.status(401).json({data:"you are not have login"})}
  if(havePermissions||rol==0){
    try{
      await functionP(req,res)
    }catch(error){
        console.log(error)
        res.status(error?.status||400).json({data:error})
    }
  }else{
    res.status(400).json({data:"this user is not authorized"})
  }
}
module.exports=manageErrors






