const Funcionario = require("../model/funcionarioModel");
const jwt = require("jsonwebtoken");

module.exports = class funcionarioController {
  //CREATE - Cadastrar Funcionário
  static async FuncionarioCreate(req, res) {
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;
    const funcionario = { nome: nome, email: email, senha: senha };
    await Funcionario.create(funcionario)
      .then(() => {
        res.json({ message: "Usuário cadastrado com sucesso!" });
      })
      .catch((error) => {
        const mensagem =
          error.response.status + " - " + error.response.data.message;
        const descricao = error.config.url;
        res.render("mensagem", {
          mensagem: mensagem,
          descricao: descricao,
          layout: "main_log_false",
        });
      });
  }

  //READ - Listar Funcionário
  static async FuncionarioListar(req, res) {
    const id_funcionario = req.params.id;
    if (id_funcionario) {
      await Funcionario.findOne({
        where: { id_funcionario: id_funcionario },
      })
        .then((funcionario) => {
          res.json(funcionario);
        })
        .catch((error) => {
          const mensagem =
            error.response.status + " - " + error.response.data.message;
          const descricao = error.config.url;
          res.render("mensagem", {
            mensagem: mensagem,
            descricao: descricao,
            layout: "main_log_true",
          });
        });
    } else {
      await Funcionario.findAll({ raw: true })
        .then((funcionario) => {
          res.json(funcionario);
        })
        .catch((error) => {
          const mensagem =
            error.response.status + " - " + error.response.data.message;
          const descricao = error.config.url;
          res.render("mensagem", {
            mensagem: mensagem,
            descricao: descricao,
            layout: "main_log_true",
          });
        });
    }
  }

  //UPDATE - Atualizar Funcionário
  static async FuncionarioUpdate(req, res) {
    const id_funcionario = req.params.id;
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;
    const funcionario = {
      nome: nome,
      email: email,
      senha: senha,
    };
    await Funcionario.update(funcionario, {
      where: { id_funcionario: id_funcionario },
    })
      .then(() => {
        res.json({ message: "Funcionário atualizado com sucesso!" });
      })
      .catch((error) => {
        const mensagem =
          error.response.status + " - " + error.response.data.message;
        const descricao = error.config.url;
        res.render("mensagem", {
          mensagem: mensagem,
          descricao: descricao,
          layout: "main_log_true",
        });
      });
  }

  //DELETE - Excluir Funcionário
  static async FuncionarioDelete(req, res) {
    const id_funcionario = req.params.id;
    await Funcionario.destroy({ where: { id_funcionario: id_funcionario } })
      .then(() => {
        res.json({ message: "Usuário excluído com sucesso!" });
      })
      .catch((error) => {
        const mensagem =
          error.response.status + " - " + error.response.data.message;
        const descricao = error.config.url;
        res.render("mensagem", {
          mensagem: mensagem,
          descricao: descricao,
          layout: "main_log_true",
        });
      });
  }

  //Verifica o login do usuário (Paulo)
  static async FuncionarioLogin(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;
    const dados = {
      email: email,
      senha: senha,
    };
    const funcionario = await Funcionario.findOne({
      where: { email: email, senha: senha },
    })
      .then((funcionario) => {
        if (funcionario != undefined) {
          const id = funcionario.id_funcionario;
          const nome = funcionario.nome;
          const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 1200,
          });
          return res.json({ auth: true, token: token, nome: nome });
        } else {
          res.status(401).json({ message: "Credenciais inválidas!" });
        }
      })
      .catch((error) => {
        const mensagem =
          error.response.status + " - " + error.response.data.message;
        const descricao = error.config.url;
        res.render("mensagem", {
          mensagem: mensagem,
          descricao: descricao,
          layout: "main_log_false",
        });
      });
  }

  // VERIFICA SE O TOKEN FOI CRIADO
  //esta função verifica se o funcionario possui autorização para acessar as rotas, compara com o SECRET
  // static async verificaJWT(req, res, next) {
  //   const token = req.headers["x-access-token"];
  //   if (!token)
  //     return res
  //       .status(401)
  //       .json({ auth: false, message: "Nenhum token criado." });
  //   jwt.verify(token, process.env.SECRET, function (err, decoded) {
  //     if (err)
  //       return res
  //         .status(500)
  //         .json({ auth: false, message: "Falha na autenticação com o token." });

  //     // Salva no request para uso posterior
  //     req.userId = decoded.id;
  //     next();
  //   });
  // }
};
