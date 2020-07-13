<?php
    include_once 'Aluno.php';
	include_once 'PDOFactory.php';

    class AlunosDAO
    {
        public function inserir(Aluno $aluno)
        {
            $qInserir = "INSERT INTO alunos(nome,sobrenome,idade) VALUES (:nome,:sobrenome,:idade)";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qInserir);
            $comando->bindParam(":nome",$aluno->nome);
            $comando->bindParam(":sobrenome",$aluno->sobrenome);
            $comando->bindParam(":idade",$aluno->idade);
            $comando->execute();
            $aluno->id = $pdo->lastInsertId();
            return $aluno;
        }

        public function deletar($id)
        {
            $qDeletar = "DELETE from alunos WHERE id=:id";            
            $aluno = $this->buscarPorId($id);
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qDeletar);
            $comando->bindParam(":id",$id);
            $comando->execute();
            return $aluno;
        }

        public function atualizar(Aluno $aluno)
        {
            $qAtualizar = "UPDATE alunos SET nome=:nome, sobrenome=:sobrenome, idade=:idade WHERE id=:id";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qAtualizar);
            $comando->bindParam(":nome",$aluno->nome);
            $comando->bindParam(":preco",$aluno->sobrenome);
            $comando->bindParam(":marca_id",$aluno->idade);
            $comando->bindParam(":id",$aluno->id);
            $comando->execute();    
            return($aluno);    
        }

        public function listar()
        {
		    $query = 'SELECT alunos.id as alunoId, alunos.nome alunoNome, alunos.sobrenome alunoSobrenome, alunos.idade alunoIdade FROM alunos';
    		$pdo = PDOFactory::getConexao();
	    	$comando = $pdo->prepare($query);
    		$comando->execute();
            $alunos=array();	
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
			    $alunos[] = new Aluno($row->alunoId,$row->alunoNome,$row->alunoSobrenome,$row->alunoIdade);
            }
            return $alunos;
        }

        public function buscarPorId($id)
        {
            $query = 'SELECT  alunos.id as alunoId, alunos.nome alunoNome, alunos.sobrenome alunoSobrenome, alunos.idade alunoIdade FROM alunos ';
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam ('id', $id);
		    $comando->execute();
            $result = $comando->fetch(PDO::FETCH_OBJ);
            if($result)
                return new Aluno($result->alunoId,$result->proalunoNomedNome,$result->alunoSobrenome,$result->alunoIdade);
            else
                return null;
        }
    }
?>