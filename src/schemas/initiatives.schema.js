const zod=require('zod')



const initiativeSchema=zod.object({
    title:zod.string({required_error:"title is requerid"}),
    descripcion:zod.string({required_error:"descripcion is requerid"}),
    url_imagen:zod.string().optional()
})


module.exports={
    initiativeSchema
}
