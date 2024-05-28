const zod=require('zod')


const filesSchema=zod.object({
    
    key_file: zod.string({required_error:"key_file is requerid"}) ,
    nombre_file: zod.string({required_error:"nombre_file is requerid"}) ,
    descripcion: zod.string().optional(),
    tipo_id :zod.number({required_error:"tipo_id is requerid"}) ,

})
const filesSchemaNuevo=zod.object({
    nombre_file: zod.string({required_error:"nombre_file is requerid"}) ,
    descripcion: zod.string().optional(),
    tipo_id :zod.string({required_error:"tipo_id is requerid"}) ,

})

module.exports={
    filesSchema,
    filesSchemaNuevo
}

