<?php 

 class colaborador{
    private $idColaborador;
    private $name;
    private $password;

    
    public function __construct()
    {
    }

    public function __destruct()
    {
    }

    public function __get($atributo)
    {
        return $this->$atributo;
    }

    public function __set($atributo, $valor)
    {
        $this->$atributo = $valor;
    }

    function __toString()
    {
        return nl2br("
                      <h1>Id: $this->idColaborador </h1> 
                      <h2>Nome: $this->name</h2>
                      <h2>Senha: $this->password</h2>" );
    }
} 


?>