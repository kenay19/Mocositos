document.getElementById('saveDate').addEventListener('click',(e)=>{
    e.preventDefault();
    const formularioCitas = document.forms['form-register-Date'];
    $.ajax({
        url: '/pediatria/addPacient',
        type: 'POST',
        dataType: 'json',
        data: {nombre: formularioCitas['nombre'].value,app : formularioCitas['app'].value,apm: formularioCitas['apm'].value,telefono : formularioCitas['telefono'].value,calle : formularioCitas['calle'].value,inte : formularioCitas['inte'].value,exte : formularioCitas['exte'].value,colonia : formularioCitas['colonia'].value,municipio : formularioCitas['municipio'].value,estado: formularioCitas['estado'].value,postal : formularioCitas['postal'].value,edad : formularioCitas['edad'].value,horario : formularioCitas['horario'].value,peso : formularioCitas['peso'].value,solicitante : formularioCitas['solicitante'].value,tecnico : formularioCitas['tecnico'].value,genero : formularioCitas['AdminGender'].value,altura: formularioCitas['altura'].value},
        success: (data)=>{}
    });
});