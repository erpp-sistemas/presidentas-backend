const zod= require('zod')



const tipoFilesChema=zod.object({
    tipo:zod.string({required_error:"tipo is requerid"}),
    descripcion:zod.string().optional()
})

module.exports ={tipoFilesChema}