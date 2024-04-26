const jwt = require("jsonwebtoken");

module.exports = class loginController {
  //Verifica se o token foi gerado
  static async verificaJWT(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token)
      return res
        .status(401)
        .json({ auth: false, message: "Nenhum token criado." });
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err)
        return res
          .status(500)
          .json({ auth: false, message: "Falha na autenticação com o token." });
      // Salva no request para uso posterior
      req.userId = decoded.id;
      console.log(token);
      next();
    });
  }
};
