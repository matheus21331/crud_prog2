class TabelaAlunos {
    constructor(controller, seletor){
        this.alunoController = controller;
        this.seletor = seletor;
    }


    montarTabela(alunos){
        var str=`
        <h2>Tabela de Alunos</h2>
        <a id="novo" href="#">Novo</a>
        <div id="tabela">
        <table>
            <tr>
                <th style='text-align: left;'>Id</th>
                <th style='text-align: left;'>Nome</th>
                <th style='text-align: left;'>Sobrenome</th>
                <th style='text-align: left;'>Idade</th>
                <th colspan="2">Ação</th>
            </tr>`;
    
        for(var i in alunos){
            str+=`<tr id=${alunos[i].id}>
                    <td>${alunos[i].id}</td>
                    <td>${alunos[i].nome}</td>
                    <td>${alunos[i].sobrenome}</td>
                    <td>${alunos[i].idade}</td>
                    <td><a class="edit" href="#">Editar</a></td>
                    <td><a class="delete" href="#">Deletar</a></td>    
                </tr>`;
                
        } 
        str+= `
        </table>
        </div>`;
    
        var tabela = document.querySelector(this.seletor);
        tabela.innerHTML = str;

        const self = this;
        const linkNovo = document.querySelector("#novo");
        linkNovo.onclick = function(event) {
            self.alunoController.carregarFormulario(event);
        }

        const linksDelete = document.querySelectorAll(".delete");
        for(let linkDelete of linksDelete)
        {
            const id = linkDelete.parentNode.parentNode.id;
            linkDelete.onclick = function(event){
                self.alunoController.deletrAluno(id);
            }
        }

        const linksEdit = document.querySelectorAll(".edit");
        for(let linkEdit of linksEdit)
        {
            const id = linkEdit.parentNode.parentNode.id;
            //Outra forma de tratar o evento (click) - nesse caso deve ter bind
            linkEdit.addEventListener("click",this.alunoController.carregaFormularioComaAluno.bind(this.alunoController,id));
        }

    }

}