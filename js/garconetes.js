$(document).ready(listarGarconetes);

function listarGarconetes() {

    $.ajax({
        url: 'http://localhost:8080/api/garconetes',
        type: 'get',
        dataType: 'json',
        success: function (result) {
            console.log(result);
            var html = '';
            $.each(result, function (i, data) {
                html += `<tr><td>` + data.id + `</td>`;
                html += `<td>` + data.matricula + `</td>`;
                html += `<td>` + data.nome + `</td>`;
                html += `<td><a href="../view/editarGarconete.html?id=` + data.id + `"><i class="bi bi-pencil-fill"></i></a>`;
                html += ` <a href="../view/visualizarGarconete.html?id=` + data.id + `"><i class="bi bi-search"></i></a>`;
                html += ` <a href="#" onclick="deletarGarconete(` + data.id + `)"><i class="bi bi-archive-fill"></i></a></td></tr>`;

                $("#tbListarGarconetesBody").html(html);
            });

            // Inicializa o DataTable após preencher os dados
            $('#tbListarGarconetes').DataTable();

            let table = new DataTable('#tbListarGarconetes');
            //Nome da tabela
        }
    })


}

function deletarGarconete(id) {

    var respostaPergunta = confirm("Confirma a exclusão?");
    if (respostaPergunta == true) {

        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/api/garconetes/' + id,
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