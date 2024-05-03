const {Sequelize}=require('sequelize')
require('dotenv').config()



const conexion= new Sequelize({
    dialect:"mssql",
    host:process.env.HOST,
    username:process.env.USERNAMEDB,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
})


module.exports=conexion

