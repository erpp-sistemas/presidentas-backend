const zod=require('zod')


const correoSchema=zod.object({
    asunto:zod.string({required_error:"asunto is requerid"}),
    cuerpo_correo:zod.string({required_error:"cuerpo_correo is requerid"}),
    destinatario:zod.string({required_error:"destinatario is requerid"}).email({message:"destinatarios is requerid a email"})
})




module.exports={
    correoSchema
}













