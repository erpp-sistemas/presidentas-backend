

    const zod=require('zod')



const postulacionesConvocatoriaSchema=zod.object({
    user_id:zod.string({required_error:"user_id is requerid"}),
	convocatoria_id :zod.string({required_error:"convocatoria_id is requerid"}),
})

module.exports={
    postulacionesConvocatoriaSchema
}





