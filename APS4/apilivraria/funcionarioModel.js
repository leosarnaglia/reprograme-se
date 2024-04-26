const Sequelize = require("sequelize");
const database = require("../db/db");
const Funcionario = database.define(
  "funcionario",
  {
    id_funcionario: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false },
    senha: { type: Sequelize.STRING, allowNull: false },
  },
  { database, modelname: "funcionario", tableName: "funcionarios" },
);

module.exports = Funcionario;
