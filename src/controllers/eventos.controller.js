const eventosModel = require("../models/eventos.model")


const getAllEventos=async()=>{
    const eventos=await eventosModel.findAll({order: [
        ['posicion', 'ASC'] 
    ]})
    return eventos
}


const getByIdEventos=async(id)=>{
    const eventos=await eventosModel.findOne({where:{id}})
    if(!eventos){
        throw {message:"This id not exist",status:404}
    }
    return eventos
}


const newEventos=async(data)=>{
    const eventos=await eventosModel.create(data)
    return eventos
}


const updateByIdEventos=async(data,id)=>{
    const eventos=await eventosModel.update(data,{where:{id}})
    return eventos
}


const deleteByIdEventos=async(id)=>{
    const eventos=await eventosModel.destroy({where:{id}})
    return eventos
}





module.exports={
    getAllEventos,
    getByIdEventos,
    newEventos,
    updateByIdEventos,
    deleteByIdEventos
}





