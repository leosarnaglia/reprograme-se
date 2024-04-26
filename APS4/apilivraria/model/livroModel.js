const Sequelize = require("sequelize");
const database = require("../db/db");

const Livro = database.define(
  "livro",
  {
    id_livro: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    titulo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    autor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    preco: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    link_imagem: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { database, modelname: "livro", tableName: "livros" },
);
module.exports = Livro;
