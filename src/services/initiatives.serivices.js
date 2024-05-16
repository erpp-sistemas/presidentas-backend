const c=require('../controllers/initiatives.controllers')


const httpGetAllInitiatives=async(req,res)=>{
    const iniciativas=await c.getAllInitiatives()
    res.status(200).json({iniciativas})
}

const httpGetByIdInitiatives=async(req,res)=>{
    const id=req.params.id
    const iniciativas=await c.getByIdInitiatives(id)
    res.status(200).json({iniciativas})
}

const httpNewInitiatives=async(req,res)=>{
    const data=req.body
    const iniciativas=await c.newInitiatives(data)
    res.status(201).json({iniciativas})
}

const httpUpdateInitiatives=async(req,res)=>{
    const data=req.body
    const id=req.params.id
    const iniciativas=await c.updateByIdInitiative(data,id)
    res.status(200).json({iniciativas})
}

const httpDeleteInitiatives=async(req,res)=>{
    const id=req.params.id
    const iniciativas=await c.deleteByIdInitiative(id)
    res.status(200).json({Message:"this initiative was delete success"})
}







module.exports={
    httpGetAllInitiatives,
    httpGetByIdInitiatives,
    httpDeleteInitiatives,
    httpNewInitiatives,
    httpUpdateInitiatives,
}

