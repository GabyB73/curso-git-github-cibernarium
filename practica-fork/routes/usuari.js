'use strict'

var express = require("express");
var UsuariController = require("../controllers/usuari");
var ImatgeController = require("../controllers/imatge");

var api = express.Router();
var multipart = require("connect-multiparty");
var md_auth = require("../middleware/authenticated");

//middleware
var md_upload = multipart({ uploadDir: './uploads/users'});

api.get("/tots", UsuariController.proves);
api.post("/registre", UsuariController.guardarUsuari);
api.post("/veureusuari", [md_auth.ensureAuth], UsuariController.veureUsuari);
api.get("/veuretotsusuari", UsuariController.veureTotsUsuari);
api.put("/actualitzar-usuari/:id", UsuariController.actualitzarUsuari);
api.delete("/borrarusuari/:id", UsuariController.borrarUsuari);
api.post("/upload-image-user/:id", [md_upload], ImatgeController.uploadImages);
api.get("/all-image-user/:id", [md_upload], ImatgeController.veureImatgeUsuari);
api.get("/veurearxiuimatge/:imageFile", ImatgeController.veureArxiuImatge);
api.delete("/borrarimatge/:id", ImatgeController.borrarImatge);
api.post("/login", UsuariController.loginUsuari);
module.exports = api;