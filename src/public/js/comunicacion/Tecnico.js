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