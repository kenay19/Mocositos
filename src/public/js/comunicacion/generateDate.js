document.getElementById('saveDate').addEventListener('click',(e) => {
    e.preventDefault();
    const form = document.forms['form-register-Date'];
    $.ajax({
        url: '/pediatria/addPacient',
        type: 'POST',
        dataType: 'json',
        data: {nombre: form['nombre'].value,app: form['app'].value,apm: form['apm'].value,telefono: form['tel'].value, calle: form['calle'].value,inte: form['inte'].value,exte: form['exte'].value,colonia: form['colonia'].value,municipio: form['municipio'].value,estado: form['estado'].value,cp: form['cp'].value,altura: form['altura'].value,genero: form['AdminGender'].value,peso: form['peso'].value,edad: form['edad'].value,horario: form['horario'].value},
        success: (data)=>{
            if(data.message == 'cita generada') {
                window.location.href = '/pediatria/addPacient';
                $.jGrowl(alert('Cita generada correctamente'));
            }else{
                console.log(data.error)
                window.location.href = '/pediatria/addPacient';
                $.jGrowl(alert('Algo ocurrio, vuelve a intentar'));            
            }
        }
    });
});