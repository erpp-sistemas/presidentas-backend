const c=require('../controllers/correo.controllers')


const httpGetAllCorreos=async(req,res)=>{
    const correos=await c.getAllCorreos()
    res.status(200).json({correos})
}

const httpGetByIdCorreos=async(req,res)=>{
    const id=req.params.id
    const correos=await c.getByIdCorreos(id)
    res.status(200).json({correos})
}

const httpNewCorreos=async(req,res)=>{
    const data=req.body
    const correos=await c.newCorreos(data)
    res.status(201).json({correos})
}

const httpUpdateCorreos=async(req,res)=>{
    const data=req.body
    const id=req.params.id
    const correos=await c.updateByIdCorreos(data,id)
    res.status(200).json({correos})
}

const httpUpdateActivoCorreos=async(req,res)=>{
    const activo=req.body.activo
    console.log(activo)
    const id=req.params.id
    const correos=await c.updateByIdCorreos({activo},id)
    res.status(200).json({correos})
}

const httpDeleteCorreos=async(req,res)=>{
    const id=req.params.id
    const correos=await c.deleteByIdCorreos(id)
    res.status(200).json({Message:"this document was delete success"})
}







module.exports={
    httpGetAllCorreos,
    httpGetByIdCorreos,
    httpDeleteCorreos,
    httpNewCorreos,
    httpUpdateCorreos,
    httpUpdateActivoCorreos
}

