const documentosInteresModel = require("../models/documentsInters.model")


const getAllDocumentosInteres=async()=>{
    const documentosInteres=await documentosInteresModel.findAll({order: [
        ['posicion', 'ASC'] 
    ]})
    return documentosInteres
}


const getByIdDocumentosInteres=async(id)=>{
    const documentosInteres=await documentosInteresModel.findOne({where:{id}})
    if(!documentosInteres){
        throw {message:"This id not exist",status:404}
    }
    return documentosInteres
}


const newDocumentosInteres=async(data)=>{
    const documentosPosiciones=await getAllDocumentosInteres()
    let newPosicion=2
    for(let i of documentosPosiciones){
        await updateByIdDocumentosInteres({posicion:newPosicion++},i.id)
    }
    const documentosInteres=await documentosInteresModel.create({...data,posicion:1,activo:1})
    return documentosInteres
}


const updateByIdDocumentosInteres=async(data,id)=>{
    const documentosInteres=await documentosInteresModel.update(data,{where:{id}})
    return documentosInteres
}


const deleteByIdDocumentosInteres=async(id)=>{
    const documentosInteres=await documentosInteresModel.destroy({where:{id}})
    return documentosInteres
}





module.exports={
    getAllDocumentosInteres,
    getByIdDocumentosInteres,
    newDocumentosInteres,
    updateByIdDocumentosInteres,
    deleteByIdDocumentosInteres
}



















