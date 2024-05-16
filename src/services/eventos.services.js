const c=require('../controllers/eventos.controller')


const httpGetAllEventos=async(req,res)=>{
    const eventos=await c.getAllEventos()
    res.status(200).json({eventos})
}

const httpGetByIdEventos=async(req,res)=>{
    const id=req.params.id
    const eventos=await c.getByIdEventos(id)
    res.status(200).json({eventos})
}

const httpNewEventos=async(req,res)=>{
    const data=req.body
    const eventos=await c.newEventos(data)
    res.status(201).json({eventos})
}

const httpUpdateEventos=async(req,res)=>{
    const data=req.body
    const id=req.params.id
    const eventos=await c.updateByIdEventos(data,id)
    res.status(200).json({eventos})
}

const httpDeleteEventos=async(req,res)=>{
    const id=req.params.id
    const eventos=await c.deleteByIdEventos(id)
    res.status(200).json({Message:"this event was delete success"})
}



module.exports={
    httpGetAllEventos,
    httpGetByIdEventos,
    httpDeleteEventos,
    httpNewEventos,
    httpUpdateEventos,
}

