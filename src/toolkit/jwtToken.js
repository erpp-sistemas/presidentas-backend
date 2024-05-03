const jwt =require('jsonwebtoken')
require('dotenv').config()


const WORD_KEY = process.env.WORD_KEY; 


 const createAccessToken=(payload)=>{
    
  return new Promise ((resolve, reject) => {
    jwt.sign(
      payload,
      WORD_KEY,
      {
        expiresIn: '1d'
      },
      (err, token) => {
        if(err) reject(err)
        resolve(token)
       }
    )
  })  
}



const validateToken=(token)=>{
    try {
        const decoded = jwt.verify(token.split(' ')[1], WORD_KEY);
        return decoded;
    } catch (error) {
        console.error('Error al decodificar el token:', error.message);
        return null;
    }
}

module.exports={
  createAccessToken,
  validateToken
}
