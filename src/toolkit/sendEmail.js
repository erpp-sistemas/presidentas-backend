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


// async..await is not allowed in global scope, must use a wrapper
const  main=async(user)=> {
    console.log("ejecutamos")
  // send mail with defined transport object
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>",user)
  try{
    const info = await transporter.sendMail({
        from: 'erppmessages@gmail.com',
        to: user.correo, 
        subject: "Credenciales Embajadoras 😎", 
        text: "Credenciales Embajadoras 😎", 
        html: `<div style="font-family: 'Poppins', sans-serif; font-weight: 500; font-style: normal; color: rgb(79, 79, 79);">

        <div style="max-width: 750px; margin: 0 auto; background-image: url(https://media.canva.com/1/image-resize/1/800_796_100_PNG_F/czM6Ly9tZWRpYS1wcml2YXRlLmNhbnZhLmNvbS9CRE1iMC9NQUdGSXBCRE1iMC8xL3AucG5n?osig=AAAAAAAAAAAAAAAAAAAAAHCIoxQvbpfQXSWJ_fQ3xX1EABbfe-me7n-jtRPov5Gk&exp=1715646102&x-canva-quality=screen&x-canva-subsampling=T&csig=AAAAAAAAAAAAAAAAAAAAAJ9xo1VfX_TL3xYM0MRppzBP1cbMKRqsvLfnn6zrw1Hi); background-position: right 82%; background-repeat: no-repeat; background-size: 35%;">
            <header style="background-color: rgb(31, 41, 55); height: 150px; display: flex">
                <img src="https://embajadoras.mx/assets/logo_presidentas_letras.a260cd35.png" alt="Embajadoras Logo"
                    style="width: 200px; margin: auto;" />
            </header>
            <div style="background-color: #c5516b; color: #ffffff; padding: 15px 10px; ">
                Credenciales Embajadoras
            </div>
    
            <div style="padding: 10px 0px; margin-bottom: 20px;">
                <p>Hola <span style="font-weight: bold; color: #c5516b;">${user.nombre} ${user.apellidop} ${user.apellidom}</span>,</p>
                <p>Te proporcionamos las credenciales con las que te registraste en la plataforma de <span
                        style="font-weight: bold; color: #c5516b;">Embajadoras</span>:</p>
                <table cellspacing="0" cellpadding="10" style="border-collapse: collapse;">
                    <tr>
                        <th style="text-align: left; border-bottom: 1px solid #dee2e6;">Correo:</th>
                        <td style="text-align: left; border-bottom: 1px solid #dee2e6;">${user.correo}</td>
                    </tr>
                    <tr>
                        <th style="text-align: left; border-bottom: 1px solid #dee2e6;">Contraseña:</th>
                        <td style="text-align: left; border-bottom: 1px solid #dee2e6;">${user.password}</td>
                    </tr>
                </table>
                <br><br>
                <div style="text-align: center;">
                    <a href="https://embajadoras.mx/"
                        style="background-color: #c5516b; color: #ffffff; outline: none; border: 0; padding: 10px 20px; border-radius: 5%; text-decoration: none;">
                        Iniciar Sesión
                    </a>
                </div>
                <br> <br> <br>
                <div style="text-align: center; font-size: smaller; margin-top: 20px;">
                Sin más por el momento le enviamos saludos.
            </div>
            <br>
        
            </div>

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
      });
      console.log("si se envio ")
      console.log("Message sent: %s", info.id);
  }catch(err){
    console.log(err)
  }
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

const  codeMail=async(user)=> {
    console.log("ejecutamos")
  // send mail with defined transport object
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>",user)
  try{
    const info = await transporter.sendMail({
        from: 'erppmessages@gmail.com',
        to: user.correo, 
        subject: "Codigo de verificación 😎", 
        text: "Codigo de verificación 😎", 
        html: `<div style="font-family: 'Poppins', sans-serif; font-weight: 500; font-style: normal; color: rgb(79, 79, 79);">

        <div style="max-width: 750px; margin: 0 auto; background-image: url(https://media.canva.com/1/image-resize/1/800_796_100_PNG_F/czM6Ly9tZWRpYS1wcml2YXRlLmNhbnZhLmNvbS9CRE1iMC9NQUdGSXBCRE1iMC8xL3AucG5n?osig=AAAAAAAAAAAAAAAAAAAAAHCIoxQvbpfQXSWJ_fQ3xX1EABbfe-me7n-jtRPov5Gk&exp=1715646102&x-canva-quality=screen&x-canva-subsampling=T&csig=AAAAAAAAAAAAAAAAAAAAAJ9xo1VfX_TL3xYM0MRppzBP1cbMKRqsvLfnn6zrw1Hi); background-position: right 82%; background-repeat: no-repeat; background-size: 35%;">
            <header style="background-color: rgb(31, 41, 55); height: 100px; display: flex">
                <img src="https://embajadoras.mx/assets/logo_presidentas_letras.a260cd35.png" alt="Embajadoras Logo"
                    style="width: 200px; margin: auto;" />
            </header>
            <div style="background-color: #c5516b; color: #ffffff; padding: 15px 10px; ">
                Credenciales Embajadoras
            </div>
    
            <div style="padding: 10px 0px; margin-bottom: 20px;">
                <p>Hola <span style="font-weight: bold; color: #c5516b;">${user.nombre} ${user.apellidop} ${user.apellidom}</span>,</p>
                <p>Este es tu codigo de verificación para afiliarse a <span
                        style="font-weight: bold; color: #c5516b;">Embajadoras</span>:</p>
                <table cellspacing="0" cellpadding="40" style="border-collapse: collapse; margin: auto;">
                    <tr>
                        <th style="text-align: left; border-bottom: 1px solid #dee2e6;">codigo:</th>
                        <td style="text-align: left; border-bottom: 1px solid #dee2e6;">1234</td>
                    </tr>
    
                </table>
                <br><br>
               
                <br> <br> <br>
                <div style="text-align: center; font-size: smaller; margin-top: 20px;">
                Sin más por el momento le enviamos saludos.
            </div>
            <br>
           
            </div>
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
      });
      console.log("si se envio ")
      console.log("Message sent: %s", info.id);
  }catch(err){
    console.log(err)
  }
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}




module.exports= {
    main,
    codeMail
}