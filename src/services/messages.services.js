const c = require("../controllers/messages.controllers")



const httpSendEmail=async(req,res)=>{
    const data=req.body
    await c.sendEmail(data)
    res.status(200).json({message:"Email Send sucess"})
}


module.exports={
    httpSendEmail
}













