const main = require("../toolkit/sendEmail")




const sendEmail=async(data)=>{
    const correo={
        ...data,
        html:data.cuerpo_correo
    }
    const user={
        correo:data.destinatario
    }

    await main(user,correo)
    return 200

}


module.exports={
    sendEmail
}