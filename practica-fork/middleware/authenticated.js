//Realitzem un middleware personalitzat per validar previ a executar el controlador corresponent la validació del token 
var jwt = require("jwt-simple"); 
var moment = require("moment"); //Executem npm i moment
var secret = "cibernarium";

exports.ensureAuth = function(req, res, next){
    //recollir l'autorització amb un header o encapçalament
    if(!req.headers.authorization){
        return res.status(403).send({message: "L'autorització no te la capçalera d'autentificació"})
    }

    var token = req.headers.authorization.replace(/['"]+/g, ''); //Recupedrem el token i treiem caracters especials

    try{
        var payload = jwt.decode(token, secret); //Aportem el token i el secret per decodificar-lo
        //Validem si ha caducat el token
        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: "El token ha expirat"});
        }
    }catch(ex){
        console.log(ex);
        return res.status(404).send({message: "El token no és vàlid"});
    }

    //Afegim dins de la petició totes les dades del usuari
    req.user = payload;

    next();
}