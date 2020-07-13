class FormAlunos {

    constructor(controller, seletor){
        this.alunoController = controller;
        this.seletor = seletor;
    }

    montarForm(aluno){
        if(!aluno){
            aluno = new aluno();
        }
        var str = `
        <h2>Formulario de Alunos</h2>
        <form id="formulario">
            <input type="hidden" id="idaluno" value="${aluno.id}" />
            <label for="txtnome">Nome:</label>
            <input type="text" id="txtnome" value="${aluno.nome ?aluno.nome :''}">
            <br />
            <label for="txtsobrenome">Sobrenome:</label>
            <input type="text" id="txtsobrenome" value="${aluno.sobrenome ?aluno.sobrenome :''}">
            <br />
            <label for="txtidade">Idade:</label>
            <input type="text" id="txtidade" value="${aluno.idade ?aluno.idade :''}">
            <br />
            <br />
            <input type="submit" id="btnsalvar" value="Salvar">
            <input type="reset" value="Cancelar">
            <br />
        </form>
        `;

        let containerForm = document.querySelector(this.seletor);
        containerForm.innerHTML = str;

        var form = document.querySelector("#formulario");
        const self = this;
        form.onsubmit = function(event){
            if(!aluno.id){
                self.alunoController.salvar(event);
            }
            else{
                self.alunoController.editar(aluno.id,event);
            }
        }

        form.onreset = function(event){
            self.alunoController.limpar(event);
        }
    }

    limparFormulario(){
        document.querySelector("#txtnome").value="";
        document.querySelector("#txtidade").value="";
        document.querySelector("#txtsobrenome").value="";

    }

    getDataAluno(){
        let aluno = new aluno();
        if(!document.querySelector("#idaluno").value)
            aluno.id = document.querySelector("#idaluno").value;
        aluno.nome = document.querySelector("#txtnome").value;
        aluno.sobrenome = document.querySelector("#txtsobrenome").value;
        aluno.idade = document.querySelector("#txtidade").value;
        return aluno;        
    }

}