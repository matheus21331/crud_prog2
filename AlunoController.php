<?php

include_once('Aluno.php');
include_once('AlunoDAO.php');

class AlunoController {

    public function listar($request, $response, $args){
        $dao= new AlunosDAO;    
        $aluno = $dao->listar();
        var_dump($aluno);
        return $response->withJSON($aluno);
    
    }

    public function inserir($request, $response, $args) {
        $data = $request->getParsedBody();

    
        $aluno = new Aluno(0,$data['nome'],$data['sobrenome'],$data['idade']);
    
        $dao = new AlunosDAO;
        $aluno = $dao->inserir($aluno);
    
        return $response->withJson($aluno,201);
    }

    public function buscarPorId($request, $response, $args) {
        $id = $args['id'];
        
        $dao= new AlunosDAO;    
        $aluno = $dao->buscarPorId($id);
        
        return $response->withJson($aluno);
    }
    
    public function atualizar($request, $response, $args) {
        $id = $args['id'];
        $data = $request->getParsedBody();

       
        $aluno = new Aluno($id,$data['nome'],$data['sobrenoe'],$data['idade']);
    
        $dao = new AlunosDAO;
        $aluno = $dao->atualizar($aluno);
    
        return $response->withJson($aluno);
    }
    
    public function deletar($request, $response, $args) {
        $id = $args['id'];
    
        $dao = new AlunosDAO;
        $aluno = $dao->deletar($id);
    
        return $response->withJson($aluno);
    }
}
?>