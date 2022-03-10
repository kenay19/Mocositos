document.getElementById('save').addEventListener('click',(e)=>{
    e.preventDefault();

    const formularioAdmin = document.forms['form-register'];
    //Variable que guardara el tipo:
    let tipo;
    if (formularioAdmin['AdminGender'].value == 'Pediatria')
    {
        tipo = 'solicitante';
    }
    else
    {
        tipo = 'tecnico'
    }
    $.ajax({
        url: '/admin/insert',
        type: 'POST',
        dataType: 'json',
        data:
        {
           tipo,
           contraseña: btoa(formularioAdmin['contraseña'].value),
           email: formularioAdmin['email'].value,
           rfc : formularioAdmin['rfc'].value,
           curp: formularioAdmin['curp'].value,
           cedulaProfesional: formularioAdmin['cedulaProfesional'].value,
           especialidad: formularioAdmin['AdminGender'].value,
           nombre: formularioAdmin['nombre'].value,
           app: formularioAdmin['app'].value,
           apm: formularioAdmin['apm'].value,
           telefono : formularioAdmin['telefono'].value,
           calle: formularioAdmin['calle'].value,
           inte: formularioAdmin['inte'].value,
           exte: formularioAdmin['exte'].value,
           colonia: formularioAdmin['colonia'].value,
           municipio: formularioAdmin['municipio'].value,
           estado: formularioAdmin['estado'].value,
           cp: formularioAdmin['cp'].value,
        },
        success: (data)=>{
            if(data.message == 'new user insert correctly')
            {
                formularioAdmin.reset();
                $.jGrowl(alert('User added successfully'),{ life : 3000});
            }//if
            else
            {
                window.location.href="/admin/addemployee";
                $.jGrowl(alert('Refill the form'),{ life : 3000});
            }
        }//success
    });
});