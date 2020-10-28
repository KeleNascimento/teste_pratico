var dados = []

function DeletaRegistro(id) {
    let _confirm = confirm("Deseja realmente efetuar a exclusão?")

    if (_confirm) {
        for(let i = 0; i < dados.length; i++) {
            if (dados[i].Id == id) {
                dados.splice(i, 1)
            }
        }

        PreencheTabela()
    }
}

function EditaRegistro(id) {
    $("#modalRegistro").modal("show")

    dados.forEach(function(item) {
        if (item.Id == id) {
            $("#hiddenId").val(item.Id)
            $("#txtNome").val(item.Nome)
            $("#txtIdade").val(item.Idade)
        }
    })
}

function PreencheTabela() {
    if (Array.isArray(dados)) {
        
        localStorage.setItem("__dados__", JSON.stringify(dados))
        
        $("#tableDados tbody").html("")
        
        dados.forEach(function (item) {
            $("#tableDados tbody").append(`<tr>
                <td>${item.Id}</td>
                <td>${item.Nome}</td>
                <td>${item.Idade}</td>
                <td><button type="button" class="btn btn-primary" onclick="javascript:EditaRegistro(${item.Id});"><i class="fa fa-edit"></button></td>
                <td><button type="button" class="btn btn-danger" onclick="javascript:DeletaRegistro(${item.Id});"><i class="fa fa-trash"</td>
            </tr>`)
        })
    }
}

$(function () {
    dados = JSON.parse(localStorage.getItem("__dados__"))

    if (dados) {
        PreencheTabela()
    }

    $("#btnSalvar").click(function() {

        let _id = $("hiddenId").val()
        let Nome = $("#txtNome").val()
        let Idade = $("#txtIdade").val()

        if (!_id || _id == "0"){
            let registro = {}
            registro.Nome = Nome
            registro.Idade = Idade

            registro.Id = dados.length + 1
            dados.push(registro)
        }
        else {
            dados.forEach(function(item) {
                if (item.Id == _id) {
                    item.Nome = Nome
                    item.Idade = Idade
                }
            })
        }

        alert("Registro salvo com sucesso!")
        $("#modalRegistro").modal("hide")

        //Cleaning
        $("hiddenId").val("0")
        $("#txtNome").val("")
        $("#txtIdade").val("")

        PreencheTabela()
    })
})
