var datos;
window.onload = () => {
    $.ajax({
        url: '/tecnic/getAntigenos',
        dataType: 'json',
        type: 'GET',
        success: (data) => {
            datos = data;
            inp.createInputAntigeno(document.getElementById('stripe-login'),document.getElementById('antigeno'),document.getElementById('conclusiones'),data);
        }
    });
}


document.getElementById('createStudy').addEventListener('click',(e) => {
    e.preventDefault();
    let json = {};
    const form = document.forms['stripe-login'];
    json.conlusiones = form['conclusiones'].value;
    json.antigeno = {}
    for (let i = 1;i <= datos.length; i++) {
        json.antigeno[i] = {
            score1: form['antigeno'+i].value,
            score2: conversion(form['antigeno'+i].value)
        };
    }
    console.log(json);
    /*$.ajax({

    });*/
});

function conversion(score) {

}