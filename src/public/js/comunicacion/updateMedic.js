


window.onload = () => {
    $.ajax({
        url: '/modify',
        type: 'POST',
        dataType: 'json',
        data: {idMedico:new URLSearchParams(window.location.search).get('id')},
        success: (data) => {
            console.log(data);
        },
        error: (error) => {
            console.error(error);
        }
    });
}