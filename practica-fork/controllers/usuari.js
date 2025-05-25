'use strict'

var Usuari = require("../models/usuari"); 
var bcrypt = require("bcrypt");
var salt = 10;
var jwt = require("../services/jwt");

function proves(req, res){
    res.status(200).send({
        message: "Provant una acció del controlador"
    });
}

function guardarUsuari(req, res){
    var usuari = new Usuari();
    var params = req.body; //recollim totes les dades que arriven en la peticio amb el metode post

    usuari.nom = params.nom;
    usuari.cognom = params.cognom;
    usuari.email = params.email;
    usuari.clau = 123456;

    //console.log(params);

    if(usuari.nom != null && usuari.cognom != null && usuari.email != null && usuari.clau != null ){
        bcrypt.hash(params.clau, salt, function(err, clauEncriptada) {
            usuari.clau = clauEncriptada;
            if(err){
                res.status(500).send({message: "Error al guardar l'usuari"});
            } else {
                var nouUsuari = usuari.save();
                if(nouUsuari.err){
                    res.status(500).send({message: "Error al guardar l'usuari"});
                } else {
                    res.status(200).send({usuari: nouUsuari});
                }
            }
        })
    } else {
        res.status(402).send({message: "Indica totes les dades"});
    }
}

function veureUsuari(req, res){
    var params = req.body;

    var email = params.email;
    //var clau = params.clau;

    Usuari.findOne({email: email.toLowerCase()}) //Permet cercar un registre per una propietat i tenim que definirli una funció fletxa amb el error i l'objecte
    .then(usuariTrobat => {
        res.status(200).send({usuaris: usuariTrobat})
    })
    .catch(err => {res.status(500).send({message: "Error en la solicitud"})});  
}

function veureTotsUsuari(req, res){
    Usuari.find()
    //console.log(Usuari.find());
      .then(usuari => {
        const usuarisJSON = usuari.map(usuaris => usuaris.toObject());
        res.status(200).send({usuaris: usuarisJSON});
      })
      .catch(err => {res.status(500).send({message: "Error en la solicitud"})});  
}

function actualitzarUsuari(req, res){
    var usuariId = req.params.id;
    var update = req.body;

    Usuari.findByIdAndUpdate(usuariId, update)
  .then(result => {
    res.status(200).send({usuari: result}); // El documento actualizado
  })
  .catch(error => {
    res.status(500).send({message: "Error al actualitzar l'usuari" + error}); // Captura y maneja cualquier error que ocurra
  });
}

function borrarUsuari(req, res){
  var usuariId = req.params.id;

  Usuari.findByIdAndDelete(usuariId)
  .then((usuariEliminat) => {
    if (usuariEliminat) {
        res.status(200).send({message: `El usuari ${usuariEliminat.nom} s'ha eliminat correctament.`});
    } else {
      res.status(404).send({message: `No s'ha pogut borrar l'usuari amb el ID ${usuariId}.`});
    }
  })
  .catch((error) => {
    res.status(500).send({message: "Error al borrar l'usuari" + error});
  });
}

function loginUsuari(req, res){
    var params = req.body;
    var email = params.email;
    var clau = params.clau;

    Usuari.findOne({email: email.toLowerCase()}) //Permet cercar un registre per una propietat i tenim que definirli una funció fletxa amb el error i l'objecte
    .then(usuariTrobat => {
        if(!usuariTrobat){
            //Cal evitar donar pistes
            res.status(404).send({message: "L'usuari no existeix"});
        } else {
            //Comprobar la clau
            bcrypt.compare(clau, usuariTrobat.clau, function(err, check){
                if(check){
                    //Retornar les dades de l'usuari identificat
                    if(params.gethash){ //Si li aportem el parametre gethash generara un token amb totes les dades de l'usuari codificades
                        //Retornar un token de jwt
                        res.status(200).send({
                            token: jwt.createToken(usuariTrobat)
                        })
                    } else {
                        res.status(200).send({usuari: usuariTrobat});
                    }
                } else {
                    res.status(404).send({message: "L'usuari no existeix"});
                }
            });
        }
    })
    .catch(err => {res.status(500).send({message: "Error en la solicitud" + err})});  
}

module.exports = {
    proves,
    guardarUsuari,
    veureUsuari,
    veureTotsUsuari,
    actualitzarUsuari,
    borrarUsuari,
    loginUsuari
};