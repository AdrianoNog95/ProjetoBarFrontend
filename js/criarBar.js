// Função de validação do formulário
function validarFormularioBar() {
    var isValid = true;

    // RN01: O atributo nome deve ser obrigatório, ter no mínimo 3 caracteres
    var nome = $('#nome').val();
    if (nome === '' || nome.length < 3) {
        isValid = false;
        alert("O campo Nome é obrigatório e deve ter no mínimo 3 caracteres.");
    }

    // RN02: O atributo cnpj deve ser válido e obrigatório
    var cnpj = $('#cnpj').val();
    if (!validarCNPJ(cnpj)) {
        isValid = false;
        alert("O campo CNPJ é obrigatório e deve ser válido.");
    }
    

    // RN03: O atributo razaoSocial deve ser obrigatório
    if ($('#razaoSocial').val() === '') {
        isValid = false;
        alert("O campo Razão Social é obrigatório.");
    }

    // RN04: O atributo rua deve ser obrigatório
    if ($('#rua').val() === '') {
        isValid = false;
        alert("O campo Rua é obrigatório.");
    }

    // RN05: O atributo numero deve ser obrigatório
    if ($('#numero').val() === '') {
        isValid = false;
        alert("O campo Número é obrigatório.");
    }

    // RN06: O atributo bairro deve ser obrigatório
    if ($('#bairro').val() === '') {
        isValid = false;
        alert("O campo Bairro é obrigatório.");
    }

    // RN07: O atributo cidade deve ser obrigatório
    if ($('#cidade').val() === '') {
        isValid = false;
        alert("O campo Cidade é obrigatório.");
    }

    // RN08: O atributo estado é obrigatório e deve possuir as seguintes opções
    var estado = $('#estado').val();
    if (estado === '') {
        isValid = false;
        alert("O campo Estado é obrigatório e deve ser uma das opções válidas.");
    }

    // RN09: O atributo cep deve ser obrigatório
    if ($('#cep').val() === '') {
        isValid = false;
        alert("O campo CEP é obrigatório.");
    }

    // RN10: O atributo telefone deve ser obrigatório
    if ($('#telefone').val() === '') {
        isValid = false;
        alert("O campo Telefone é obrigatório.");
    }

    // RN11: O atributo lotacaoMaxima pode variar entre 1 e 999
    var lotacaoMaxima = parseInt($('#lotacaoMaxima').val());
    if (isNaN(lotacaoMaxima) || lotacaoMaxima < 1 || lotacaoMaxima > 999) {
        isValid = false;
        alert("O campo Lotação Máxima deve ser um número entre 1 e 999.");
    }

    return isValid;
}

// Processar formulário
$('#formInserirBar').on('submit', function (event) {
    event.preventDefault();

    if (validarFormularioBar()) {
        var formData = {
            'id': $('#id').val(),
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

        console.log(formData);
        console.log(JSON.stringify(formData));

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            type: 'POST',
            url: 'http://localhost:8080/api/bars',
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

function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, ''); // Remove tudo o que não é dígito
    telefone = telefone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3'); // Formata o telefone
    return telefone;
}

// Função para validar CNPJ (RN02)
function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    if (/^(\d)\1+$/.test(cnpj))
        return false;

    var tamanho = cnpj.length - 2;
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) return false;

    return true;
}