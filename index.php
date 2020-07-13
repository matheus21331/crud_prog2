<?php
use Slim\Factory\AppFactory;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

include_once('AlunoController.php');

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

$app->group('/api/alunos', function($app){
    $app->get('', 'AlunoController:listar');
    $app->post('', 'AlunoController:inserir');

    $app->get('/{id}', 'AlunoController:buscarPorId');    
    $app->put('/{id}', 'AlunoController:atualizar');
    $app->delete('/{id}', 'AlunoController:deletar');
});

$app->run();
?>