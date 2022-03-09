document.getElementById('save').addEventListener('click',(e)=>{
    e.preventDefault();
    const formularioAdmin = document.forms['form-register'];
    $.ajax({
        url: '/admin/insert',
        type: 'POST',
        dataType: 'json',
        data:
        {
           rfc : formularioAdmin['rfc'].value,
           curp: formularioAdmin['curp'].value,
           cedulaProfesional: formularioAdmin['cedulaProfecional'].value,
           especialidad: formularioAdmin['especialidad'].value,
           nombre: formularioAdmin['nombre'].value,
           app: formularioAdmin['app'].value,
           apm: formularioAdmin['apm'].value,
           tel : formularioAdmin['tel'].value,
           calle: formularioAdmin['calle'].value,
           inte: formularioAdmin['inte'].value,
           exte: formularioAdmin['exte'].value,
           colonia: formularioAdmin['colonia'].value,
           municipio: formularioAdmin['municipio'].value,
           estado: formularioAdmin['estado'].value,
           cp: formularioAdmin['cp'].value,
        },
        success: (data)=>{
            console.log();
        }//success
    });
});