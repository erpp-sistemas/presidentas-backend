const correosModel = require("../models/correo.model")


const getAllCorreos=async()=>{
    const correos=await correosModel.findAll()
    return correos
}


const getByIdCorreos=async(id)=>{
    const correos=await correosModel.findOne({where:{id}})
    if(!correos){
        throw {message:"This id not exist",status:404}
    }
    return correos
}


const newCorreos=async(data)=>{
    const documentosPosiciones=await getAllCorreos()
    let newPosicion=2
    for(let i of documentosPosiciones){
        await updateByIdCorreos({posicion:newPosicion++},i.id)
    }
    const correos=await correosModel.create({...data,posicion:1,activo:1})
    return correos
}


const updateByIdCorreos=async(data,id)=>{
    const correos=await correosModel.update(data,{where:{id}})
    return correos
}


const deleteByIdCorreos=async(id)=>{
    const correos=await correosModel.destroy({where:{id}})
    return correos
}





module.exports={
    getAllCorreos,
    getByIdCorreos,
    newCorreos,
    updateByIdCorreos,
    deleteByIdCorreos,
}



















