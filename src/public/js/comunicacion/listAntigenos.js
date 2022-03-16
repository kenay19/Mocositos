var datos;
window.onload = () => {
    $.ajax({
        url: '/tecnic/getAntigenos',
        dataType: 'json',
        type: 'GET',
        success: (data) => {
            datos = data;
            inp.createInputAntigeno(document.getElementById('stripe-login'),document.getElementById('antigeno'),document.getElementById('conclusiones'),data);
        }
    });
}


document.getElementById('createStudy').addEventListener('click',(e) => {
    e.preventDefault();
    let json = {};
    const form = document.forms['stripe-login'];
    json.conclusiones = form['conclusiones'].value;
    for (let i = 1;i <= datos.length; i++) {
        json[i] =form['antigeno'+i].value;
    }
    json.cita =  new URLSearchParams(window.location.search).get('idCita');
    console.log(json);
    $.ajax({
        url:'/tecnic/createEstudy',
        data: json,
        type: 'POST',
        dataType: 'json',
        success: (data) => {
            window.location.href = '/tecnic/pdf?idEstudio='+data.idEstudio;
        }
    });
});

