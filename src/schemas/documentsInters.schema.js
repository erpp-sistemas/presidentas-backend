const zod=require('zod')



const documentSchema=zod.object({
    title:zod.string({required_error:"title is requerid"}),
    descripcion:zod.string({required_error:"descripcion is requerid"}),
    url_documento:zod.string({required_error:"url_documento is requerid"}),
    posicion:zod.number({required_error:"posicion is requerid"}),
    activo:zod.number({required_error:"activo is requerid"})
})


module.exports={
    documentSchema
}
