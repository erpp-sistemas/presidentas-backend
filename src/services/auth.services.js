const c =require('../controllers/auth.controllers');
const {validateToken} = require('../toolkit/jwtToken');

//? //////////////

const httpLogin=async(req,res)=>{
    const data=req.body
        const user=await c.login(data)
        res.cookie("token", user.token)
            res.status(200).json({user})
}

//? //////////////

const httpRegister=async(req,res)=>{
    const data=req.body
  
        const user=await c.register(data)
        res.status(201).json({message:"user created success",user})
}

//? //////////////

const httpLogauth=async(req,res)=>{
    res.cookie("token", "", {
        expires: new Date(0),
      });
      return res.sendStatus(200);
}

//? //////////////

module.exports={
    httpLogin,
    httpRegister,
    httpLogauth
}









