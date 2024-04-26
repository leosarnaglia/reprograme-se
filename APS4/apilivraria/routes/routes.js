/////////////// MÓDULOS ///////////////
const express = require("express");
const router = express.Router();

/////////////// CONTROLLERS ///////////////
const funcionarioController = require("../controller/funcionarioController");
const livroController = require("../controller/livroController");
const loginController = require("../controller/loginController");

/////////////// Requisições HTTP Principal ///////////////
router.get("/", (req, res) => {
  return res.json({ mensage: "Sistema de Cadastro de Livros" });
});

/////////////// Requisições HTTP Funcionario ///////////////
//POST - Login
router.post("/login", funcionarioController.FuncionarioLogin);
//POST - Cadastrar
router.post("/funcionarios", funcionarioController.FuncionarioCreate);
//GET - Listar
router.get(
  "/funcionarios/:id?",
  loginController.verificaJWT,
  funcionarioController.FuncionarioListar,
);
//PUT - Atualizar
router.put(
  "/funcionarios/:id",
  loginController.verificaJWT,
  funcionarioController.FuncionarioUpdate,
);
// DELETE - Apagar
router.delete(
  "/funcionarios/:id",
  loginController.verificaJWT,
  funcionarioController.FuncionarioDelete,
);

/////////////// Requisições HTTP Livro ///////////////

//POST - Cadastrar
router.post(
  "/livros/Cadastrar",
  loginController.verificaJWT,
  livroController.LivroCreate,
);
//PUT - Atualizar
router.put(
  "/livros/:id",
  loginController.verificaJWT,
  livroController.LivroUpdate,
);
// DELETE - Apagar
router.delete(
  "/livros/:id",
  loginController.verificaJWT,
  livroController.LivroDelete,
);
//GET - Listar
router.get(
  "/livros/:id?",
  loginController.verificaJWT,
  livroController.LivroListar,
);

module.exports = router;
