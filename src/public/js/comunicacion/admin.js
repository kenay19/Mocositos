window.onload = () => {
    $.ajax({
        url: '/admin/getType',
        dataType: 'json',
        type: 'GET',
        success: (data) => {
            if(data.length == 1) {
               if (data[0].especialidad == 'Pediatria') {
                   console.log('pediatria')
                    document.getElementById('Pediatria').parentNode.removeChild(document.getElementById('Pediatria'));
               }else{
                   console.log('alegorlogia')
                    document.getElementById('Alergologia').parentNode.removeChild(document.getElementById('Alergologia'));
               }
            }else if(data.length >1){
                window.location.href = "/admin";
                $.jGrowl(alert('No se pueden agregar mas usuario'));
            }
        },
        error: (data) => {
            console.log(data);
        }
    });
}

document.getElementById('save').addEventListener('click',(e)=>{
    e.preventDefault();
    const formularioAdmin = document.forms['form-register'];
    let tipo;
    if (document.querySelector('input[name="AdminGender"]:checked').value == 'Pediatria'){tipo = 'solicitante';}
    else{tipo = 'tecnico'}
    $.ajax({
        url: '/admin/insert',
        type: 'POST',
        dataType: 'json',
        data:{tipo,contraseña: btoa(formularioAdmin['contraseña'].value),email: formularioAdmin['email'].value,rfc : formularioAdmin['rfc'].value,curp: formularioAdmin['curp'].value,cedulaProfesional: formularioAdmin['cedulaProfesional'].value,especialidad: document.querySelector('input[name="AdminGender"]:checked').value,nombre: formularioAdmin['nombre'].value,app: formularioAdmin['app'].value,apm: formularioAdmin['apm'].value,telefono : formularioAdmin['telefono'].value,calle: formularioAdmin['calle'].value,inte: formularioAdmin['inte'].value,exte: formularioAdmin['exte'].value,colonia: formularioAdmin['colonia'].value, municipio: formularioAdmin['municipio'].value,estado: formularioAdmin['estado'].value,cp: formularioAdmin['cp'].value},
        success: (data)=>{
            if(data.message == 'new user insert correctly'){
               window.location.href="/admin/addemployee";
               $.jGrowl(alert('User added successfully'),{ life : 3000});
            }else{
                window.location.href="/admin/addemployee";
                $.jGrowl(alert('Refill the form'),{ life : 3000});
            }
        }//success
    });
});

