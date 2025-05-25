"use strict" //Per obtenir compatibilitat amb les ultimes versions

var mongoose = require("mongoose");
const app = require("./app");
const port = 3000;

try {
  mongoose.connect('mongodb://localhost:27017/curs_nodejs');
  console.log("La base de dades está funcionant correctamente");
  app.listen(port, () => {
    console.log("Exemple d'app escoltant");
  });
} catch (error) {
  console.log("La base de dades no está funcionant correctamente" + error);
}