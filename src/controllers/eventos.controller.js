const { Sequelize } = require("sequelize");
const asistenciaEventoModel = require("../models/asistenciaEvento.model");
const eventosModel = require("../models/eventos.model");
const tipoRegistroModel = require("../models/tipoRegistro.Model");


  
const arrayMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

const getAllEventos=async()=>{
    const eventos=await eventosModel.findAll({order: [
        ['fecha_evento', 'ASC'] 
    ],
    attributes: [
        "id","title","descripcion","fecha_evento","url_foto","posicion","activo",
        [Sequelize.literal(`(
            SELECT COUNT(*)
            FROM asistencia_evento 
            WHERE
                asistencia_evento.id_evento = eventos.id
        )`), 'asistentes']
    ],
})
   
        const dateToday=new Date()
        const arrayEventosPasados=[]
        const arrayEventos=[]
    
        for (let obj of eventos) {
        
            const fechaEvento = new Date(obj.fecha_evento);
    
            const year = fechaEvento.getFullYear();
            const month = fechaEvento.getMonth() ;
            const day = fechaEvento.getDate(); 
            const hour = fechaEvento.getUTCHours().toString(); 
            const minutes = fechaEvento.getUTCMinutes().toString();
            
            const fechaFormateada=`${day} de ${arrayMeses[month]} del ${year}`
            const horaFormateada=`${hour.length>1?hour:"0"+hour} : ${minutes.length>1?minutes:"0"+minutes}`

          if(fechaEvento<dateToday){
           arrayEventosPasados.push({...obj.dataValues,fechaFormateada,horaFormateada})
          }else{
            arrayEventos.push({...obj.dataValues,fechaFormateada,horaFormateada})
          }
  
        }

    return {proximos:arrayEventos,realizados:arrayEventosPasados}
}


const getByIdEventos=async(id)=>{
    let eventos=await eventosModel.findOne({where:{id}})
    let eventDate = new Date(eventos.fecha_evento).toISOString();
    [cortada]=eventDate.split('Z')
    const fechaEvento = new Date(eventos.fecha_evento);
    
            const year = fechaEvento.getFullYear();
            const month = fechaEvento.getMonth() ;
            const day = fechaEvento.getDate(); 
            const hour = fechaEvento.getUTCHours().toString(); 
            const minutes = fechaEvento.getUTCMinutes().toString();
            
            const fechaFormateada=`${day} de ${arrayMeses[month]} del ${year}`
            const horaFormateada=`${hour.length>1?hour:"0"+hour} : ${minutes.length>1?minutes:"0"+minutes}`

     
        eventos={...eventos.dataValues,fecha_evento:cortada,fechaFormateada,horaFormateada}
    
    if(!eventos){
        throw {message:"This id not exist",status:404}
    }
    return eventos
}


const newEventos=async(data)=>{
    const eventosPosiciones=await getAllEventos()
    let newPosicion=2
    const eventDate = new Date(data.fecha_evento);

    for(let i of eventosPosiciones.proximos){
        await updateByIdEventos({posicion:newPosicion++},i.id)
    }

    const eventos=await eventosModel.create({...data,posicion:1,activo:1,fecha_evento:eventDate.toISOString() })

    return eventos
}


const updateByIdEventos=async(data,id)=>{
    if(data?.fecha_evento){
       [fecha,hora]=data.fecha_evento.split("T")
        data={...data,fecha_evento:`${fecha} ${hora}`}
    }
    const eventos=await eventosModel.update(data,{where:{id}})
    return eventos
}


const deleteByIdEventos=async(id)=>{
    await asistenciaEventoModel.destroy({where:{id_evento:id}})
    const eventos=await eventosModel.destroy({where:{id}})
    return eventos
}




module.exports={
    getAllEventos,
    getByIdEventos,
    newEventos,
    updateByIdEventos,
    deleteByIdEventos
}





