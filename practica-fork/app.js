"use strict"

const express = require('express');
var bodyParser = require("body-parser");

const app = express();

//Carregar rutes
var user_routes = require("./routes/usuari");

//Middlewares o tasques que s'han de realitzar abans de rebre la petició
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar capçaleres

//Rutes base
app.use("/api", user_routes); //Definim una ruta base sobre la que treballar

module.exports = app;