document.getElementById('search').addEventListener('change', (e) => {
    e.preventDefault();
    nombre = document.getElementById('serch').value;
    $.ajax({
        url: '/pediatra/',
        type: 'POST',
        dataType: 'json',
        data:
        {
            nombre
        },
        success: (data)=>{
            card.createCardPediatra(document.getElementById('study-container'),document.getElementsByClassName('cards')[0],data);
        },
        error: (data)=>{
            $.jGrowl(alert('There is no data'),{ life : 3000});
        }
    });
});