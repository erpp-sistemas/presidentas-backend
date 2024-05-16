const c=require('../controllers/documentsInters.controllers')


const httpGetAllDocumentosInteres=async(req,res)=>{
    const documentos=await c.getAllDocumentosInteres()
    res.status(200).json({documentos})
}

const httpGetByIdDocumentosInteres=async(req,res)=>{
    const id=req.params.id
    const documentos=await c.getByIdDocumentosInteres(id)
    res.status(200).json({documentos})
}

const httpNewDocumentosInteres=async(req,res)=>{
    const data=req.body
    const documentos=await c.newDocumentosInteres(data)
    res.status(201).json({documentos})
}

const httpUpdateDocumentosInteres=async(req,res)=>{
    const data=req.body
    const id=req.params.id
    const documentos=await c.updateByIdDocumentosInteres(data,id)
    res.status(200).json({documentos})
}

const httpDeleteDocumentosInteres=async(req,res)=>{
    const id=req.params.id
    const documentos=await c.deleteByIdDocumentosInteres(id)
    res.status(200).json({Message:"this document was delete success"})
}







module.exports={
    httpGetAllDocumentosInteres,
    httpGetByIdDocumentosInteres,
    httpDeleteDocumentosInteres,
    httpNewDocumentosInteres,
    httpUpdateDocumentosInteres,
}

