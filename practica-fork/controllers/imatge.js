'use strict'

var Usuari = require("../models/usuari"); 
var Imatge = require("../models/imatge");
var fs = require('fs'); //Pert treballar amb el sistema de fitxers
var path = require('path');

function uploadImages(req, res){
    var imatge = new Imatge(); //Instanciem l'objecte de la col·lecció imatge
    var userId = req.params.id;
    var file_name = "No pujat...";

    //Anem a comprobar si rebem algo per les variables globals de la peticio "files"
    if(req.files){ //recollim totes les dades que arriven en la peticio amb el metode post
        var file_path = req.files.image.path;
        var file_split = file_path.split("\\");
        var file_name = file_split[2];
        imatge.arxiu = file_name; //Poblem l'objecte amb el nom d'arxiu
        imatge.usuari = userId; //Poblem l'objecte amb el id d'usuari

        var ext_split = file_path.split("\.");
        var file_ext = ext_split[1]; //Per obtenir l'extensió de l'arxiu

        //Comprovem si l'extensió és de les autoritzades
        if(file_ext == "png" || file_ext == "jpg" || file_ext == "gif"){
            var imatgeGuardada = imatge.save();
            if(imatgeGuardada.err){
                res.status(500).send({message: "Error al guardar la imatge"});
            } else {
                res.status(200).send({imatge: imatgeGuardada});
            }
        } else  {
            res.status(403).send({message: "Extensió de l'arxiu no vàlida"});
        }
        //console.log(file_split); //Per provar
    } else {
        //Resposta per quan no rebem correctament l'arxiu
        res.status(402).send({message: "No has pujat ninguna imatge..."});
    }
}

function veureImatgeUsuari(req, res){
    var idUsuari = req.params.id;

    Imatge.find({usuari: idUsuari}) //Permet cercar un registre per una propietat i tenim que definirli una funció fletxa amb el error i l'objecte
    .then(imatgesTrobades => {
        const imatgesJSON = imatgesTrobades.map(imatges => imatges.toObject());
        res.status(200).send({imatges: imatgesJSON});
    })
    .catch(err => {res.status(500).send({message: "Error en la solicitud"})});
}

function veureArxiuImatge(req, res){
    var imageFile = req.params.imageFile; //Indicarem com a parametre en el slug el nom del arxiu i si existeix ens retornarà l'arxiu sense necessitat de mostrar la ruta a on esta enmagatzemat l'arxiu.
    var path_file = './uploads/users/' + imageFile + '.png';
    
       if(fs.existsSync(path_file)){
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(404).send({message: "No existeix la imatge... " + path_file});
        }
}

function borrarImatge(req, res){
    var imatgeId = req.params.id;
  
    Imatge.findByIdAndDelete(imatgeId)
    .then((imatgeEliminada) => {
      if (imatgeEliminada) {
          res.status(200).send({message: `El arxiu ${imatgeEliminada.arxiu} s'ha eliminat correctament.`});
          var path_file = './uploads/users/' + imatgeEliminada.arxiu;
    
          if(fs.existsSync(path_file)){
            fs.unlinkSync(path_file);
          } else {
            res.status(404).send({message: "No existeix la imatge... " + imatgeEliminada.arxiu});
          }
      } else {
        res.status(404).send({message: `No s'ha pogut borrar l'arxiu amb el ID ${imatgeId}.`});
      }
    })
    .catch((error) => {
      res.status(500).send({message: "Error al borrar l'imatge " + error});
    });
  }

module.exports = {
    uploadImages,
    veureImatgeUsuari,
    veureArxiuImatge,
    borrarImatge
};