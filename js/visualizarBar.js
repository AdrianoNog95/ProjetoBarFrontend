// Formatar telefone
function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, ''); // Remove tudo o que não é dígito
    telefone = telefone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3'); // Formata o telefone
    return telefone;
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

var id_bar = GetURLParameter("id");

// Processar formulário
$('#formVisualizarBar').submit(function (event) {
    event.preventDefault();

    if (validarFormularioBar()) {
        var formData = {
            'id': id_bar,
            'nome': $('#nome').val(),
            'cnpj': $('#cnpj').val(),
            'razaoSocial': $('#razaoSocial').val(),
            'rua': $('#rua').val(),
            'numero': $('#numero').val(),
            'bairro': $('#bairro').val(),
            'cidade': $('#cidade').val(),
            'estado': $('#estado').val(),
            'cep': $('#cep').val(),
            'telefone': formatarTelefone($('#telefone').val()),
            'lotacaoMaxima': parseInt($('#lotacaoMaxima').val())
        };

        console.log(JSON.stringify(formData));

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            type: 'PUT',
            url: 'http://localhost:8080/api/bars/' + id_bar,  // Inclua o ID na URL
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function (data) {
                location.href = '../paginasCard/bares.html';
            },
            error: function (data) {
                $('#div-alert-message').prepend(data.responseText);
                $('#div-alert-message').fadeIn();
            }
        });
    } else {
        alert("Por favor, revise os campos não preenchidos.");
    }
});

$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8080/api/bars/' + id_bar,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#nome").val(data.nome);
            $("#cnpj").val(data.cnpj);
            $("#razaoSocial").val(data.razaoSocial);
            $("#rua").val(data.rua);
            $("#numero").val(data.numero);
            $("#bairro").val(data.bairro);
            $("#cidade").val(data.cidade);
            $("#estado").val(data.estado);
            $("#cep").val(data.cep);
            $("#telefone").val(formatarTelefone(data.telefone));
            $("#lotacaoMaxima").val(data.lotacaoMaxima);
        }
    })
});
