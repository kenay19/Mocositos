document.getElementById('save').addEventListener('click',(e)=>{
    e.preventDefault();
    const formularioAdmin = document.forms['form-register'];
    $.ajax({
        url: '/admin/insert',
        type: 'POST',
        dataType: 'json',
        data: formularioAdmin,
        success: (data)=>{
            console.log(data);
        }
    });
});