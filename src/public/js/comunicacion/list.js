window.onload = () => {
    $.ajax({
        url: '/admin/list',
        dateType: 'json',
        type: 'POST',
        success: (data) => {
            row.createRow(document.getElementById('tabla'),document.getElementById('datos'),data);
        }
    });
}