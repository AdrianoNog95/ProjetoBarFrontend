$(document).ready(onInit);

function onInit() {
    // Requisição para obter total de bares
    $.ajax({
        url: "http://localhost:8080/api/bars",
        type: "get",
        dataType: "json",
        success: function (res) {
            console.log("Resposta para bares:", res);
            if (res && res.total !== undefined) {
                $("#input-total-bares").val(res.total);
            } else {
                console.error("Formato de resposta inesperado para bares:", res);
            }
        },
        error: function (xhr, status, error) {
            console.error("Erro ao obter total de bares:", status, error);
        }
    });

    // Requisição para obter total de garçonetes
    $.ajax({
        url: "http://localhost:8080/api/garconetes",
        type: "get",
        dataType: "json",
        success: function (res) {
            console.log("Resposta para garçonetes:", res);
            if (res && res.total !== undefined) {
                $("#input-total-garconetes").val(res.total);
            } else {
                console.error("Formato de resposta inesperado para garçonetes:", res);
            }
        },
        error: function (xhr, status, error) {
            console.error("Erro ao obter total de garçonetes:", status, error);
        }
    });
}
