<?php

    class Aluno {
        public $id;
        public $nome;
        public $sobrenome;
        public $idade;

        function __construct($id, $nome, $idade, $sobrenome){
            $this->id = $id;
            $this->nome = $nome;
            $this->sobrenome = $sobrenome;
            $this->idade = $idade;
        }
    }
?>