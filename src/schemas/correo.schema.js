const zod=require('zod')



const correoSchema=zod.object({
    asunto:zod.string({required_error:"asunto is requerid"}),
    html:zod.string({required_error:"html is requerid"}),
})


module.exports={
    correoSchema
}
