const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: 'erppmessages@gmail.com',
      pass: 'oeev somf eahc kbjd' 
  } 
});


const formatearHtml=(html,data)=>{
  
    let newData={...data,nombre:`${data.nombre} ${data.apellidop} ${data.apellidom}`}

    let text_html=html

    for(let key in newData){
        let value=data[key]?newData[key]:""
        let keyUpper=key.toUpperCase();
        text_html=text_html.replace(`{{${keyUpper}}}`,value)
    }

    return text_html
}


const  main=async(user,correo)=> {
    
    const htmlInit=`
    <div style="font-family: 'Poppins', sans-serif; font-weight: 500; font-style: normal; color: rgb(79, 79, 79);">

<div style="max-width: 750px; margin: 0 auto; background-image: url(https://embajadoras.mx/assets/avatarCorreo.5098cdb3.webp); background-position: right 92%; background-repeat: no-repeat; background-size: 35%;">
    <header style="background-color: rgb(31, 41, 55); height: 100px; display: flex">
        <img src="https://embajadoras.mx/assets/logo_presidentas_letras.a260cd35.png" alt="Embajadoras Logo"
            style="width: 200px; margin: auto;" />
    </header>
    <div style="background-color: #c5516b; color: #ffffff; padding: 15px 10px; ">
       ${correo.asunto}
    </div>
    ${correo.html}
    <footer style="display: flex;  width: 100%; background-color: #1f2937; color: #ffffff; text-align: center; padding: 15px 0;">
        <div style="text-align: center; width: 100%; margin: auto; z-index: 29; font-size: x-small;">
            <span>Embajadoras ® <a href="https://embajadoras.mx/" style="color: #e46f88; text-decoration: none;">https://embajadoras.mx/</a></span>
            <br />
            <span>ERPP ®. Todos los derechos reservados. | Declaración de privacidad</span>
            <br />
            ERPP Corporativo | Balmes 11 | Col. Polanco, CDMX C.P.1151
        </div>
    </footer>
</div>
</div>
    `
    const htmlFormateado=formatearHtml(htmlInit,user)

  try{
    const info = await transporter.sendMail({
        from: 'erppmessages@gmail.com',
        to: user.correo, 
        subject: correo?.asunto, 
        text: correo.asunto, 
        html:`${htmlFormateado}`
      });
      console.log("si se envio ")
      console.log(">>>>>>>>>>>SE ENVIO<<<><<<<<<<<<<<<<<<<<<");
  }catch(err){
    console.log(err)
  }

}



module.exports=main