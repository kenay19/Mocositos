//Login:
document.getElementById('blogin').addEventListener('click',(e)=>{
    e.preventDefault();
    const formulario = document.forms['login'];

    $.ajax({
        url : '/',
        type : 'POST',
        dataType : 'json',
        data:
        {
            email : formulario['email'].value,
            contraseña : btoa(formulario['contra'].value) //Encriptamos la contraseña. --> Para desencriptar se ocupa (atob)
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

            else if(data.message == 'password is incorrect')
            {
                setTimeout(function(){
                    alert('Enter the data again');
                },3000);
            }//else if

        }//success
    });//ajax
});//document