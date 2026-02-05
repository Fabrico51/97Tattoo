<?php
session_start();

include "../model/colaborador.php";
include "../util/validation.php";

switch ($_GET['op'] ?? '') {

    case 'login':

        // Só executa se o formulário foi enviado
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $error = [];

            if (empty($_POST['name']) || !Validation::validationName($_POST['name'])) {
                $error[] = 'Nome incorreto';
            }

            if (empty($_POST['password']) || !Validation::validationPassword($_POST['password'])) {
                $error[] = 'Senha incorreta';
            }

            // SE NÃO HOUVER ERROS
            if (count($error) === 0) {

                // LIMPA QUALQUER ERRO ANTIGO
                unset($_SESSION['error']);

                header('Location: ../view/collaborators/collaborators.php');
                exit;

            } else {

                $_SESSION['error'] = serialize($error);

                header('Location: ../view/login.php');
                exit;
            }
        }

        break;
}
