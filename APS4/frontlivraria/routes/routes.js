const express = require("express");

const ServiceMain = require("../services/main");
const ServiceFuncionarios = require("../services/funcionarios");
const ServiceLivros = require("../services/livros")

const router = express.Router();

/////////////// Requisições HTTP Principal ///////////////

//GET - Home
router.get("/", ServiceMain.Home);

/////////////// Requisições HTTP Funcionario ///////////////

//GET - Login
router.get("/login", ServiceFuncionarios.LoginForm);

//POST - Login
router.post("/login", ServiceFuncionarios.Login);


//GET - Cadastrar Funcionários
router.get("/funcionarios/Cadastrar", ServiceFuncionarios.FuncionarioCadastrarForm);

//POST - Cadastrar Funcionários
router.post("/funcionarios/Cadastrar", ServiceFuncionarios.FuncionarioCadastrar);

//GET - Alterar Funcionários
router.get("/funcionarios/Alterar/:id", ServiceFuncionarios.FuncionarioAlterarForm);

//POST - Alterar Funcionários
router.post("/funcionarios/Alterar", ServiceFuncionarios.FuncionarioAlterar);

//DELETE - Excluir Funcionários
router.get("/funcionarios/Deletar/:id", ServiceFuncionarios.FuncionarioDeletar);

//GET - Listar Funcionários
router.get("/funcionarios/:id?", ServiceFuncionarios.FuncionarioListar);

/////////////// Requisições HTTP Livro ///////////////

//POST Cadastrar Livros
router.get("/livros/Cadastrar", ServiceLivros.LivroCadastrarForm);

//POST Deletar Livros
router.get("/livros/Deletar/:id", ServiceLivros.LivroDeletar);

//GET - Listar Livros
router.get("/livros/:id?", ServiceLivros.LivroListar);

//POST - Cadastrar Livros
router.post("/livros/Cadastrar", ServiceLivros.LivroCreate);

//GET - Alterar Livros
router.get("/livros/Alterar/:id", ServiceLivros.LivroAlterarForm);

//POST - Alterar Livros
router.post("/livros/Alterar", ServiceLivros.LivroAlterar);

module.exports = router;
