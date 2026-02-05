<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../css/collaborators/login.css">
  <title>Document</title>
 
</head>

<body>
  <section class="login-container">
    <div style="text-align: center; margin-top: -30px; margin-bottom: 10px;">
    <img src="../img/logo.png" alt="" style="width:230px; height:230px;">
    </div>
    <?php
    session_start();
    //isset - verificando se a variável possui algum valor ou não 
    // verificar o dia da minha morte também seria bom

    if (!empty($_SESSION['error'])) {
      $error = unserialize($_SESSION['error']);

      foreach ($error as $e) {
        echo '<p style="color:red; text-align:center;">' . $e . '</p>';
      }

      // IMPORTANTE: apaga o erro após exibir
      unset($_SESSION['error']);
    }
    ?>
    <form action="../controller/login.controller.php?op=login" method="POST">
      <div class="input-group">
        <label for="email">NOME</label>
        <input type="name" id="name" name="name" pattern="[a-zA-Z]*" placeholder="Cristiano Ronaldo" required>
      </div>

      <div class="input-group">
        <label for="password">SENHA</label>
        <input type="password" id="txtpassword" name="password" placeholder="••••••••" required>
      </div>

      <button type="submit">ENVIAR</button>
      <div>
      <img src="../img/inkitoacenando.png" alt="" class="inkito">
      </div>
    </form>
  </section>
</body>

</html>