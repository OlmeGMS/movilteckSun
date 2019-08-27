'use strict'

var  jwt   = require('jwt-simple');
var moment = require('moment');
var secret = 'moviltecksun830';

exports.authenticated = function(req, res, next){
    // Comprobar si llega autorizacion

    if (!req.headers.authorization) {
        return res.status(403).send({
            success: false,
            message: 'La petición no tiene cabecera de authorization'
        });
    }

    // Limpiar el token y quitar comillas
    var token = req.headers.authorization.replace(/['"]+/g, '');
    
    try {
        // Decodificar token
        var payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()) {
            return res.status(404).send({
                success: false,
                message: 'El token ha expirado'
            }); 
        }
        
    } catch (ex) {
        return res.status(404).send({
            success: false,
            message: 'El token no es válido'
        }); 
    }

    // Adjuntar usuario identificar a request
    req.user = payload;

    // Pasa a la acción
    next();
};