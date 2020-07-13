class AlunoController{  
    constructor() {
        this.alunoService = new AlunoAPIService(); 
        this.tabelaalunos = new TabelaAlunos(this,"main");
        this.formalunos = new FormAlunos(this,"main");
    } 

    inicializa(){
        this.carregarAlunos();
    }

    carregarFormulario(){
        event.preventDefault();
        this.formalunos.montarForm();
    }

    carregarAlunos(){
        const self = this;
        //definição da função que trata o buscar alunos com sucesso
        const sucesso = function(alunos){
            self.tabelaalunos.montarTabela(alunos);
        }

        //definição da função que trata o erro ao buscar os alunos
        const trataErro = function(statusCode) {
            console.log("Erro:",statusCode);
        }

        this.alunoService.buscarAlunos(sucesso, trataErro);
    }

    limpar(event){
        event.preventDefault();
        this.formalunos.limparFormulario();
        this.carregarAlunos();
    }
    
    salvar(event){        
        event.preventDefault();
        var aluno = this.formalunos.getDataAluno();        
        console.log("aluno", aluno);

        this.salvarAluno(aluno);

    }

    salvarAluno(aluno){
        const self = this;

        const sucesso = function(alunoCriado) {
            console.log("Aluno Criado",alunoCriado);
            self.carregarAlunos();
            self.formalunos.limparFormulario();
        }

        const trataErro = function(statusCode) {
            console.log("Erro:",statusCode);
        }
                
        this.alunoService.enviarAluno(aluno, sucesso, trataErro);    

    }

    deletarAluno(id, event){
        const self = this;
        this.alunoService.deletarAluno(id, 
            //colocar direto a funcao no parametro
            //nao precisa criar a variavel ok e erro
            function() {
                self.carregarAlunos();
            },
            function(status) { 
                console.log(status);
            }
        );
    }

    carregaFormularioComAluno(id, event){
        event.preventDefault();             
        
        const self = this;
        const ok = function(aluno){
            self.formalunos.montarForm(aluno);
        }
        const erro = function(status){
            console.log(status);
        }

        this.alunoService.buscarAluno(id,ok,erro);   
    }

    editar(id,event){
        event.preventDefault();
    
        let aluno = this.formalunos.getDataAluno();
        
        const self = this;

        this.alunoService.atualizarAluno(id,aluno, 
            function() {
                self.formalunos.limparFormulario();
                self.carregarAlunos();
            },
            function(status) {
                console.log(status);
            } 
        );

    }

        
}