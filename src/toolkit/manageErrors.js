const { validateToken } = require("./jwtToken")

//* Maneja los permisos 
const managePermissions=(rol,token)=>{
  let candado=true
  const daraToken=validateToken(token)
 
  if(rol&&daraToken.id){

    candado=daraToken.rol==rol;

  }
  return candado
}



const manageErrors=(functionP,rol)=>async(req,res)=>{
  const token=req.headers.authorization
  const havePermissions=managePermissions(rol,token)

  console.log(">>>>>>>>>>>>>>> Ruta autorizada :",havePermissions)

  if(havePermissions){
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






