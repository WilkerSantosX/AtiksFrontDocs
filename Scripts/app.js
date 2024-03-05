$(document).ready(function () {			 
    $('.sidenav').sidenav();
    $('.modal').modal();
    $('.tooltipped').tooltip();
    $('select').formSelect();
});

function Salvar(){
    $("#select-operadora-modal").text($("#select-operadora").val());
    $("#select-cliente-modal").text($("#select-cliente").val());
    $("#select-servico-modal").text($("#select-servico").val());

    $("#input-url-modal").text($("#input-url").val());
    $("#input-login-modal").text($("#input-login").val());
    $("#input-senha-modal").text($("#input-senha").val());
    $("#input-conta-modal").text($("#input-conta").val());

    $('#modalUploadArquivo').modal('open');
}
