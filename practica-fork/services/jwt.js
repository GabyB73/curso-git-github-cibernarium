//Creem un arxiu per realitzar els mètodes que treballaran amb JWT
var jwt = require("jwt-simple"); //No oblidem de instal.lar la llibreria bcrypt, jwt-simple, moment, npm i bcrypt
//Anem a realitzar el Payload que és l'objecte a on contindrem el token i a on situarem la data de creació del token i la de caducitat
var moment = require("moment");
var secret = "cibernarium";

exports.createToken = function(usuari){
    var payload = {
        //creem un objecte json
        sub: usuari._id,
        name: usuari.nom,
        surname: usuari.cognom,
        email: usuari.email,
        iat: moment().unix(), //Format Timestamp
        exp: moment().add(30, 'days').unix()
    };

    return jwt.encode(payload, secret);
};