


window.onload = () => {
    var url = window.location.search;
    var idMedic = url.substring(url.lastIndexOf('/') + 1);
    alert(idMedic); 
}