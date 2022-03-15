window.onload = () => {
    $.ajax({
        url: '/tecnic/getAntigenos',
        dataType: 'json',
        type: 'GET',
        success: (data) => {
            console.log(data.length);
            inp.createInputAntigeno(document.getElementById('stripe-login'),document.getElementById('antigeno'),document.getElementById('conclusiones'),data);
        }
    });
}