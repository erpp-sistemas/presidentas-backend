const zod=require('zod')



const eventosSchema=zod.object({
    title:zod.string({required_error:"title is requerid"}),
    descripcion:zod.string({required_error:"descripcion is requerid"}),
    url_foto:zod.string().optional(),
    fecha_evento:zod.string({required_error:"fecha_evento is requerid"}),
    posicion:zod.number({required_error:"posicion is requerid"}),
    activo:zod.number({required_error:"activo is requerid"})
})


module.exports={
    eventosSchema
}
