window.onload = () => {
    $.ajax({
        url: '/admin/list',
        dateType: 'json',
        type: 'POST',
        success: (data) => {
            console.log(data);
            row.createTableEmplado(document.getElementById('tabla'),document.getElementById('datos'),data);
        }
    });
}