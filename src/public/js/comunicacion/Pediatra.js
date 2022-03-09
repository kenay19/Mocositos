document.getElementById('search').addEventListener('keyup', (e) => {
    e.preventDefault();
    nombre = document.getElementById('search').value;
    console.log(nombre);
    $.ajax({
        url: '/pediatra/',
        type: 'POST',
        dataType: 'json',
        data:
        {
            nombre
        },
        success: (data)=>{
            if(data.has('idPDF'))
            {
                card.createCardPediatra(document.getElementById('study-container'),document.getElementsByClassName('cards')[0],data);
            }
            else
            {
                $.jGrowl(alert('There is no data'),{ life : 3000});
            }
        }
    });
});