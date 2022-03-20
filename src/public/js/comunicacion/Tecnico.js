window.onload = () => {
    $.ajax({
        url: '/tecnic/getDates',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            card.createCardDate(document.getElementById('study-container'),document.getElementsByClassName('card')[0],data);
        }
    });
}

document.getElementById('search').addEventListener('keyup', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('search').value;
    $.ajax({
        url: '/tecnic/selectDates',
        type: 'POST',
        dataType: 'json',
        data:{nombre},
        success: (data) => {
            card.createCardDate(document.getElementById('study-container'),document.getElementsByClassName('card')[0],data);
        }
    });
});