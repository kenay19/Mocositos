document.getElementById('save').addEventListener('click',(e)=>{
    e.preventDefault();
    const formularioAdmin = document.forms['form-register'];
    let tipo;
    if (formularioAdmin['AdminGender'].value == 'Pediatria'){
        tipo = 'solicitante';
    }else{
        tipo = 'tecnico'
    }
    $.ajax({
        url: '/admin/insert',
        type: 'POST',
        dataType: 'json',
        data:
        {
           contraseña: btoa(formularioAdmin['contraseña'].value),
           email: formularioAdmin['email'].value,
           rfc : formularioAdmin['rfc'].value,
           curp: formularioAdmin['curp'].value,
           cedulaProfesional: formularioAdmin['cedulaProfesional'].value,
           especialidad: formularioAdmin['AdminGender'].value,
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
           tipo
        },
        success: (data)=>{
            console.log();
        }//success
    });
});