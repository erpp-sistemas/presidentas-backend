const zod=require('zod')



const eventosSchema=zod.object({
    title:zod.string({required_error:"title is requerid"}),
    descripcion:zod.string({required_error:"descripcion is requerid"}),
    url_foto:zod.string().optional(),
    fecha_evento:zod.string({required_error:"fecha_evento is requerid"}),
})


module.exports={
    eventosSchema
}
