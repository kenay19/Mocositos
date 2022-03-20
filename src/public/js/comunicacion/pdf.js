window.onload = () => {
    $.ajax({
        url : '/tecnic/pdf',
        type : 'POST',
        dataType : 'json',
        data: {idEstudio: new URLSearchParams(window.location.search).get('idEstudio')},
        success: (data) => {
            document.getElementById('nombre').innerHTML = data.paciente.nombre;
            document.getElementById('nombre').setAttribute('data-valor',data.paciente.nombre);
            document.getElementById('edad').innerHTML = "Edad: "+data.paciente.edad;
            document.getElementById('altura').innerHTML = "Altura: "+data.paciente.altura;
            document.getElementById('peso').innerHTML = "Peso: "+data.paciente.peso;
            document.getElementById('genero').innerHTML = "Genero: "+data.paciente.genero;
            document.getElementById('tecnico').innerHTML = data.tecnico;
            document.getElementById('solicitante').innerHTML = data.solicitante;
            document.getElementById('conclusiones').innerHTML = data.conclusiones;
            document.getElementById('horario').innerHTML = data.horario;    
            row.createTableAntigeno(document.getElementsByTagName('table')[0],document.getElementsByTagName('tbody')[0],data.antigenos);
        }
    });
}

document.getElementById('generarpdf').addEventListener('click',(e)=>{
    e.preventDefault();
    let list = document.getElementById('pdf');
    $.ajax({
        url: "/tecnic/generator",
        type: "POST",
        data:{ file: list.innerHTML,nombre: document.getElementById('nombre').textContent,estudio: new URLSearchParams(window.location.search).get('idEstudio')},
        success: (data) => {
            if(data.message = 'create pdf correctly') {
                window.location.href = '/tecnic';
                $.jGrowl(alert('Estudio realizado exitosamente'),{ life : 3000});
            }else{
                window.location.href = '/tecnic';
                $.jGrowl(alert('No se pudo crear el pdf'),{ life : 3000});
            }
        }
    
    });
});