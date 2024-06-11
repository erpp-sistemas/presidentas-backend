const zod = require('zod')



const convocatoriasGuardadasSchema=zod.object({
    convocatoria_id:zod.string({required_error:"convocatoria_id is requerid"}),

})


module.exports={
    convocatoriasGuardadasSchema
}