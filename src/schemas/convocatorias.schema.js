const zod=require('zod')



const convocatoriaSchema=zod.object({
    titulo_convocatoria:zod.string({required_error:"titulo_convocatoria is requerid"}),
	categorias_id :zod.string({required_error:"categorias_id is requerid"}),
	descripcion :zod.string({required_error:"descripcion is requerid"}),
	fecha_limite_postulacion :zod.string({required_error:"fecha_limite_postulacion is requerid"}),
})

const categoriaSchema=zod.object({
    nombre_categoria:zod.string({required_error:"nombre_categoria is requerid"}),
})

module.exports={
	convocatoriaSchema,
	categoriaSchema
}