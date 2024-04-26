const path = require('path');
const express = require("express");
const app = express();

// Arquivos estáticos
// app.use("/css", express.static(__dirname + "/css"));

const hand = require("express-handlebars");
const handlebars = hand.create({
  "defaultLayout": "main_log_true"
});

const routes = require("./routes/routes");

const cookieParser = require("cookie-parser");

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
//app.set('views', './views');
app.set('views', path.join(__dirname, "/views"));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

app.listen(3000);