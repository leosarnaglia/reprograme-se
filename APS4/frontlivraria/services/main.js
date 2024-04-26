module.exports = class Home {
  //Main
  static async Home(req, res) {
    const token = req.cookies.token;
    if (!token)
      res.render("wellcome", { layout: 'main_log_false' });
    else
      res.render("mensagem", { layout: 'main_log_true' });
  }
}
