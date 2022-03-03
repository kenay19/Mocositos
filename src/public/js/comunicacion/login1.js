//Login:
document.getElementById('blogin').addEventListener('click',(e)=>{
    e.preventDefault();
    const formulario = document.forms['login'];
    $.ajax({
        url : 'http://localhost:4000',
        type : 'POST',
        dataType : 'json',
        data: {
            email : formulario['email'].value,
            contra : formulario['contra'].value
        },
        success: (data)=>{
            if(data.message == 'credentials are correct')
            {
                if(data.type == 'admin')
                {
                    window.location.href="https:localhost:4000/admin";
                }//pediatra
                else if(data.message=='pediatra')
                {
                    window.location.href="https:localhost:4000//pediatria";
                }//pediatra
                else
                {
                    window.location.href="https:localhost:4000//tecnic";
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