// Função para converter data do formato yyyy-mm-dd para dd/mm/yyyy
function converterDataParaBrasileiro(data) {
    var partes = data.split('-');
    return partes[2] + '/' + partes[1] + '/' + partes[0];
}

// Função de validação do formulário
function validarFormularioGarconete() {
    var isValid = true;
}
 

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

var id_garconete = GetURLParameter("id");

// Processar formulário
$('#formEditarGarconete').submit(function (event) {
    event.preventDefault();

    if (validarFormularioGarconete()) {
        var dataContratacao = new Date($('#dataContratacao').val()); 
        var formData = {
            'id': id_garconete,
            'matricula': $('#matricula').val(),
            'nome': $('#nome').val(),
            'cpf': $('#cpf').val(),
            'rg': $('#rg').val(),
            'telefone': $('#telefone').val(),
            'dataContratacao': dataContratacao.toISOString(), 
            'statusTrabalho': $('#statusTrabalho').val(), 
            'salario': $('#salario').val()
        };

        console.log(JSON.stringify(formData));

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            type: 'PUT',
            url: 'http://localhost:8080/api/garconetes/' + id_garconete,
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function (data) {
                location.href = '../paginasCard/garconetes.html';
            },
            error: function (data) {
                $('#div-alert-message').prepend(data.responseText);
                $('#div-alert-message').fadeIn();
            }
        });
    }
});

$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8080/api/garconetes/' + id_garconete,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#matricula").val(data.matricula);
            $("#nome").val(data.nome);
            $("#cpf").val(data.cpf);
            $("#rg").val(data.rg);
            $("#telefone").val(data.telefone);
            $("#dataContratacao").val(data.dataContratacao);
            $("#statusTrabalho").val(data.statusTrabalho);
            $("#salario").val(data.salario);         
        }
    });
});
