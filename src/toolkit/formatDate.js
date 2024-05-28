


const arrayMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

const formatDateText=(fecha)=>{
    const fechaEvento = new Date(fecha);

    const year = fechaEvento.getFullYear();
    const month = fechaEvento.getMonth() ;
    const day = fechaEvento.getDate(); 
    const hour = fechaEvento.getUTCHours().toString(); 
    const minutes = fechaEvento.getUTCMinutes().toString();
    
    const fechaFormateada=`${day} de ${arrayMeses[month]} del ${year}`
    const horaFormateada=`${hour.length>1?hour:"0"+hour}:${minutes.length>1?minutes:"0"+minutes}`
    const fechaHoraFormateada=`${fechaFormateada} a las ${horaFormateada}`
    return{
        fechaFormateada,
        horaFormateada,
        fechaHoraFormateada
    }
}


module.exports={
    formatDateText
}