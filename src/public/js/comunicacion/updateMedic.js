window.onload = () => {
    $.ajax({
        url: '/admin/modify',
        type: 'POST',
        dataType: 'json',
        data: {
            idMedico:new URLSearchParams(window.location.search).get('id')
        },
        success: (data) => {
            datos = data[0];
            document.getElementById('email').value = data[0].email;
            document.getElementById('rfc').value = datos.rfc;
            document.getElementById('curp').value = datos.curp;
            document.getElementById('cedulaProfesional').value = datos.cedulaProfesional;
            document.getElementById('nombre').value = datos.nombre;
            document.getElementById('app').value = datos.app;
            document.getElementById('apm').value = datos.apm;
            document.getElementById('telefono').value = datos.telefono;
            document.getElementById('calle').value = datos.calle;
            document.getElementById('inte').value = datos.inte;
            document.getElementById('exte').value = datos.exte;
            document.getElementById('colonia').value = datos.colonia;
            document.getElementById('municipio').value = datos.municipio;
            document.getElementById('estado').value = datos.estado;
            document.getElementById('cp').value = datos.cp;
            document.getElementById('contraseña').value = datos.contraseña;
        }
    });
};

document.getElementById('update').addEventListener('click',(e) => {
    const formularioUpdate = document.forms['form-update'];
    let tipo;
    if (document.querySelector('input[name="AdminGender"]:checked').value== 'Pediatria')
    {
        tipo = 'solicitante';
    }
    else
    {
        tipo = 'tecnico';
    }
    $.ajax({
        url: '/admin/update',
        type: "POST",
        dataType: "json",
        data:
        {
           tipo,
           idMedico: new URLSearchParams(window.location.search).get('id'),
           email: formularioUpdate['email'].value,
           contraseña: btoa(formularioUpdate['contraseña'].value),
           rfc : formularioUpdate['rfc'].value,
           curp: formularioUpdate['curp'].value,
           cedulaProfesional: formularioUpdate['cedulaProfesional'].value,
           especialidad: document.querySelector('input[name="AdminGender"]:checked').value,
           nombre: formularioUpdate['nombre'].value,
           app: formularioUpdate['app'].value,
           apm: formularioUpdate['apm'].value,
           telefono : formularioUpdate['telefono'].value,
           calle: formularioUpdate['calle'].value,
           inte: formularioUpdate['inte'].value,
           exte: formularioUpdate['exte'].value,
           colonia: formularioUpdate['colonia'].value,
           municipio: formularioUpdate['municipio'].value,
           estado: formularioUpdate['estado'].value,
           cp: formularioUpdate['cp'].value,
        },
        success: (data) => {
            if(data.message == 'user modify correctly') {
                $.jGrowl(alert('Usuario modificado correctamente'),{ life : 3000});
            }else{
                $.jGrowl(alert('No se pudo actualizar el usuario'),{ life : 3000});
            }
            window.location.href = '/admin/list';
        },
        error: (data)=>{
            $.jGrowl(alert('No se pudo actualizar el usuario'),{ life : 3000});
            window.location.href = '/admin/list';

        }
   });
});
