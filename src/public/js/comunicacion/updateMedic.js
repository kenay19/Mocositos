


window.onload = () => {
    $.ajax({
        url: 'admin/modify',
        type: 'POST',
        dataType: 'json',
        data: {idMedico:new URLSearchParams(window.location.search).get('id')},
        success: (data) => {
            console.log(data);
        }
    })
}