// Função para converter data do formato yyyy-mm-dd para dd/mm/yyyy
function converterDataParaBrasileiro(data) {
    var partes = data.split('-');
    return partes[2] + '/' + partes[1] + '/' + partes[0];
}

// Função de validação do formulário
function validarFormularioGarconete() {
    var isValid = true;

    // RN01: O atributo matricula deve ser único e composto por caracteres numéricos;
    var matricula = $('#matricula').val();
    if (matricula === '' || !/^\d+$/.test(matricula)) {
        isValid = false;
        alert("O campo matrícula é obrigatório e deve conter apenas números.");
    }

    // RN02: O atributo nome deve ter no mínimo 3 caracteres, no máximo 50 caracteres e deve ser obrigatório;
    var nome = $('#nome').val();
    if (nome === '' || nome.length < 3 || nome.length > 50) {
        isValid = false;
        alert("O campo nome é obrigatório e deve ter entre 3 e 50 caracteres.");
    }

    // RN03: O atributo cpf deve ser válido e obrigatório;
    var cpf = $('#cpf').val();
    if (cpf === '' || !validarCPF(cpf)) {
        isValid = false;
        alert("O campo CPF é obrigatório e deve ser válido.");
    }

    // RN04: O atributo rg deve ser obrigatório;
    if ($('#rg').val() === '') {
        isValid = false;
        alert("O campo RG é obrigatório.");
    }

    // RN05: O atributo telefone deve ser obrigatório;
    if ($('#telefone').val() === '') {
        isValid = false;
        alert("O campo Telefone é obrigatório.");
    }

    // RN06: O atributo dataContratacao deve ser uma data válida;
    var dataContratacao = $('#dataContratacao').val();
    if (dataContratacao === '' || isNaN(Date.parse(dataContratacao))) {
        isValid = false;
        alert("O campo Data de Contratação é obrigatório e deve ser uma data válida.");
    }

    // RN07: O atributo statusTrabalho é obrigatório e deve conter um dos valores: ativo, licença-maternidade, férias, desligado;
    var statusTrabalho = $('#statusTrabalho').val();
    if (statusTrabalho === '') {
        isValid = false;
        alert("O campo Status de Trabalho é obrigatório e deve ser um dos seguintes valores: ativo, licença-maternidade, férias, desligado.");
    }

    // RN08: O atributo salario deve ser obrigatório;
    if ($('#salario').val() === '') {
        isValid = false;
        alert("O campo Salário é obrigatório.");
    }

    return isValid;
}

// Validador de CPF (implementação básica para exemplo)
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }
    var soma = 0;
    for (var i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    var resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (var i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

// Processar formulário
$('#formInserirGarconete').on('submit', function (event) {
    event.preventDefault();

    if (validarFormularioGarconete()) {
        var formData = {
            'matricula': $('#matricula').val(),
            'nome': $('#nome').val(),
            'cpf': $('#cpf').val().trim(),
            'rg': $('#rg').val(),
            'telefone': formatarTelefone($('#telefone').val()),
            'dataContratacao': converterDataParaBrasileiro($('#dataContratacao').val()),
            'statusTrabalho': $('#statusTrabalho').val(),
            'salario': parseFloat($('#salario').val())
        };

        console.log(formData);  
        console.log(JSON.stringify(formData)); 

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            type: 'POST',
            url: 'http://localhost:8080/api/garconetes',
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
    } else {
        alert("Por favor, revise os campos não preenchidos.");
    }
});

function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, ''); // Remove tudo o que não é dígito
    telefone = telefone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3'); // Formata o telefone
    return telefone;
}
