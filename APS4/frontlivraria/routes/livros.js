const { axios, urlAPI } = require("./config");

module.exports = class Livros {

  //Create livro
  static async LivroCadastrarForm(req, res) {
    res.render("livros/Cadastrar", { layout: 'main_log_true' });
  }

  //Create livro
  static async LivroCreate(req, res) {
    const token = req.cookies.token;
    let valores = req.body;
    const options = {
      url: urlAPI + "livros/Cadastrar",
      method: "POST",
      headers: {
        "x-access-token": token
      },
      data: valores,
    };
    axios(options).then(() => {
      const mensagem = "Livro cadastrado com sucesso!";
      res.render("mensagem", { mensagem: mensagem, layout: 'main_log_true' });
    }).catch((error) => {
      res.clearCookie('token', { path: '/' })
      const mensagem = error.response.status + " - " + error.response.data.message;
      const descricao = error.config.url;
      res.render("mensagem", { mensagem: mensagem, descricao: descricao, layout: 'main_log_true' });
    });
  }

  //Listar Livros
  static async LivroListar(req, res) {
    const token = req.cookies.token;
    const options = {
      url: urlAPI + "livros",
      method: "GET",
      headers: {
        "x-access-token": token
      },
      data: {},
    };
    axios(options).then((response) => {
      const livro = response.data;
      res.render("livros/listar", { livro });
    }).catch((error) => {
      res.clearCookie('token', { path: '/' })
      const mensagem = error.response.status + " - " + error.response.data.message;
      const descricao = error.config.url;
      res.render("mensagem", { mensagem: mensagem, descricao: descricao, layout: 'main_log_true' });
    });
  }

  //Delete Livro
  static async LivroDeletar(req, res) {
    const token = req.cookies.token;
    const id = req.params.id;
    const options = {
      url: urlAPI + "livros/" + id,
      method: "DELETE",
      headers: {
        "x-access-token": token
      },
      data: {},
    };
    axios(options).then((response) => {
      res.redirect("/livros");
    }).catch((error) => {
      res.clearCookie('token', { path: '/' })
      const mensagem = error.response.status + " - " + error.response.data.message;
      const descricao = error.config.url;
      res.render("mensagem", { mensagem: mensagem, descricao: descricao, layout: 'main_log_true' });
    });
  }

  //Alterar Livros
  static async LivroAlterarForm(req, res) {
    const token = req.cookies.token;
    const id = req.params.id;
    const options = {
      url: urlAPI + "livros/" + id,
      method: "GET",
      headers: {
        "x-access-token": token
      },
      data: {},
    };
    axios(options).then((response) => {
      const livro = response.data;
      res.render("livros/Update", { livro, layout: 'main_log_true' });
    }).catch((error) => {
      const mensagem = error.response.status + " - " + error.response.data.message;
      const descricao = error.config.url;
      res.render("mensagem", { mensagem: mensagem, descricao: descricao, layout: 'main_log_true' });
    });
  }

  //Alterar Livros
  static async LivroAlterar(req, res) {
    const token = req.cookies.token;
    let valores = req.body;
    let id = valores.id_livro;
    const options = {
      url: urlAPI + "livros/" + id,
      method: "PUT",
      headers: {
        "x-access-token": token
      },
      data: valores,
    };
    axios(options).then((response) => {
      res.redirect("/livros");
    }).catch((error) => {
      const mensagem = error.response.status + " - " + error.response.data.message;
      const descricao = error.config.url;
      res.render("mensagem", { mensagem: mensagem, descricao: descricao, layout: 'main_log_true' });
    });
  }
}