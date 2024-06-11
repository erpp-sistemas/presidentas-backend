const { validateToken } = require("./jwtToken")

//! IMPORTANT
//? COMO FUNIONA|| EL ROL SE VERIFICA CON EL TOKEN DEL HEADER
//!
//*Si No mete Rol quiere decir que no nesecita estar logueado para usar la ruta 
//!
//* ROL 1-- ES EL DEL ADMINISTRATIVO 
//* ROL 2-- ES EL DEL USUARIO NORMAL 
//* ROL 0-- SOLO NECESITA ESTAR LOGUEADO PERO CUALQUIER ROL PUEDE ACCEDER A LA RUTA

//? //////////////////////////////////////////////////////////////////////////////////////

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

  console.log(">>>>>>>>>>>>>>> Ruta autorizada : el rol",rol,"Tiene permiso",havePermissions)
  
  if(havePermissions==null&&rol!=undefined){return res.status(401).json({data:"you are not have login"})}
  
  if(havePermissions||rol==0||rol==undefined){
   
    try{
      await functionP(req,res)
    }catch(error){
        console.log(">>>XXXX>>>>>>>>>",error)
       
          res.status(error?.status || 400).json({message:error?.message||"hola bro", data: error });
      
    }
  }else{
    res.status(400).json({data:"this user is not authorized"})
  }
}
module.exports=manageErrors






