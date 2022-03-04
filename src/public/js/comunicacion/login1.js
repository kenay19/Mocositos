//Login:
document.getElementById('blogin').addEventListener('click',(e)=>{
    e.preventDefault();
    const formulario = document.forms['login'];
    $.ajax({
        url : '/',
        type : 'POST',
        dataType : 'json',
        data: {
            email : formulario['email'].value,
            contraseña : formulario['contra'].value
        },
        success: (data)=>{
            if(data.message == 'credentials are correct')
            {
                if(data.type == 'admin')
                {
                    window.location.href="/admin";
                }//pediatra
                else if(data.message=='pediatra')
                {
                    window.location.href="/pediatria";
                }//pediatra
                else
                {
                    window.location.href="/tecnic";
                }//tecnico
            }//if 1

            if(data.message == 'password is incorrect')
            {

            }//if 2

            if(data.message == 'email and password is incorrect')
            {

            }//if 3
        }//success
    });//ajax
});//document