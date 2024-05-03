const zod=require('zod')

const loginSchema=zod.object({
    correo:zod.string({required_error:"correo is requerid"}),
    contrasena:zod.string({required_error:"contrasena is requerid"})
}).strip();


const registerSchema=zod.object({
    correo:zod.string({required_error:"correo is requerid"}),
    contrasena:zod.string({required_error:"contrasena is requerid"}),
    nombre:zod.string({required_error:"nombre is requerid"}),
    apellidop:zod.string().optional(),
    tell:zod.number({required_error:"tell is requerid",message:"tell is requerid 10 digit"}).min(10),
    fecha_nacimiento:zod.string({required_error:"fecha_nacimiento is requerid"}).date(),
    rol:zod.number({required_error:"rol is requerid"})
    
}).strip();

module.exports={
    loginSchema,
    registerSchema
}


