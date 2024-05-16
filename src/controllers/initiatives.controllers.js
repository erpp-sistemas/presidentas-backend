const initiativesModel = require("../models/initiatives.model")


const getAllInitiatives=async()=>{
    const initiatives=await initiativesModel.findAll({order: [
        ['posicion', 'ASC'] 
    ]})
    return initiatives
}


const getByIdInitiatives=async(id)=>{
    const initiatives=await initiativesModel.findOne({where:{id}})
    if(!initiatives){
        throw {message:"This id not exist",status:404}
    }
    return initiatives
}

const newInitiatives=async(data)=>{
    const iniciativasPosiciones=await getAllInitiatives()
    let newPosicion=2
    for(let i of iniciativasPosiciones){
        await updateByIdInitiative({posicion:newPosicion++},i.id)
    }
    const initiatives=await initiativesModel.create({...data,posicion:1,activo:1})
    return initiatives
}


const updateByIdInitiative=async(data,id)=>{
    const initiatives=await initiativesModel.update(data,{where:{id}})
    return initiatives
}


const deleteByIdInitiative=async(id)=>{
    const initiatives=await initiativesModel.destroy({where:{id}})
    return initiatives
}





module.exports={
    getAllInitiatives,
    getByIdInitiatives,
    newInitiatives,
    updateByIdInitiative,
    deleteByIdInitiative
}



















