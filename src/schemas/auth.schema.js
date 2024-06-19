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
    calle:zod.string().optional(),
    numeroExt:zod.string().optional(),
    colonia:zod.string().optional(),
    tell_casa:zod.string().optional(),
    tell:zod.number({required_error:"tell is requerid"}),
    fecha_nacimiento:zod.string({required_error:"fecha_nacimiento is requerid"}).date(),
    // rol:zod.number({required_error:"rol is requerid"})
    
}).strip();

const registerSchemaMasivo=zod.object({
    correo:zod.string({required_error:"correo is requerid"}),
    nombre:zod.string({required_error:"nombre is requerid"}),
    id_evento:zod.number({required_error:"id_evento is requerid"}),
    fecha_asistencia:zod.string({required_error:"fecha_asistencia is requerid"}),
    apellidom:zod.string().optional(),
    apellidop:zod.string().optional(),
    estado:zod.string().optional(),
    municipio:zod.string().optional(),
    
});

module.exports={
    loginSchema,
    registerSchema,
    registerSchemaMasivo
}


