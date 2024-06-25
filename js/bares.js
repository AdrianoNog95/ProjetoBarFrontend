$(document).ready(listarBares);

function listarBares() {

    $.ajax({
        url: 'http://localhost:8080/api/bars',
        type: 'get',
        dataType: 'json',
        success: function (result) {
            console.log(result);
            var html = '';
            $.each(result, function (i, data) {
                html += `<tr><td>` + data.id + `</td>`;
                html += `<td>` + data.nome + `</td>`;
                html += `<td>` + data.cnpj + `</td>`;
                html += `<td><a href="../view/editarBar.html?id=` + data.id + `"><i class="bi bi-pencil-fill"></i></a>`;
                html += ` <a href="../view/visualizarBar.html?id=` + data.id + `"><i class="bi bi-search"></i></a>`;
                html += ` <a href="#" onclick="deletarBar(` + data.id + `)"><i class="bi bi-archive-fill"></i></a></td></tr>`;

                $("#tbListarBaresBody").html(html);
            });

            // Inicializa o DataTable após preencher os dados
            $('#tbListarBares').DataTable();
            
            let table = new DataTable('#tbListarBares');
            //Nome da tabela
        }
    })


}

function deletarBar(id) {

    var respostaPergunta = confirm("Confirma a exclusão?");
    if (respostaPergunta == true) {

        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/api/bars/' + id,
            dataType: 'json',
            success: function (result) {
                location.reload();
            },
            error: function (result) {
                alert(result);
            }
        })

    }
}