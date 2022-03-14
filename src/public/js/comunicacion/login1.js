//Login:
document.getElementById('blogin').addEventListener('click', (e) => {
    e.preventDefault();
    const formulario = document.forms['login'];
    if (formulario['email'].value == 'admin' && formulario['contra'].value == 'admin') {
        window.location.href = "/admin";
    } else {
        $.ajax({
            url: '/',
            type: 'POST',
            dataType: 'json',
            data:{email: formulario['email'].value,contraseña: btoa(formulario['contra'].value)},
            success: (data) => {
                alert(data[0]);
                if (data.message == 'credentials are correct') {
                    if (data.type == 'solicitante') {
                        window.location.href = "/pediatria";
                    }else {
                        window.location.href = "/tecnic";
                    }//tecnico
                } else if (data.message != 'credentials are correct') {
                    $.jGrowl(alert('Enter the data again'), { life: 3000 });
                }//else if

            }//success
        });//ajax
    }

});//document