'use strict'

var validator = require('validator');
var bcrypt    = require('bcrypt-nodejs');
var User      = require('../models/user');

var controller = {

    save: function(req, res) {
        // Recoger los parametros de la petición
        var params = req.body;

        console.log(params.name);
        

        // Validar los datos
        var validate_name     = !validator.isEmpty(params.name);
        var validate_surname  = !validator.isEmpty(params.surname);
        var validate_email    = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        var validate_password = !validator.isEmpty(params.password);

        console.log(validate_name, validate_surname, validate_email, validate_password);
        

        if (validate_name && validate_surname && validate_email && validate_password) {

            // Crear objeto de usuario
            var user = new User();
            user.name    = params.name;
            user.surname = params.surname;
            user.email   = params.email.toLowerCase();
            user.rol     = 'Comercial';
            

            // Comprobar si el usuario existe
            User.findOne({email: user.email}, (err, issetUser) => {
                if (err) {
                    return res.status(500).send({
                        message: 'Error al verificar si el usuario existe'
                    });
                }

                if (!issetUser) {

                    // Cifrar contraseña
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;
                        // Guardar Usuario

                        // Devolver respuesta
                        user.save((err, userStored) => {
                            if (err) {
                                return res.status(500).send({
                                    message: 'Error al guardar el usuario'
                                });
                            } 

                            if (!userStored) {
                                return res.status(400).send({
                                    message: 'El usuario no se ha guardado'
                                });
                            }

                            return res.status(200).send({user: userStored});
                        });

                    });

                    
                    
                } else {
                    return res.status(500).send({
                        message: 'El usuario ya esta registrado en la base de datos'
                    });
                }
            });


            
            
        } else {
            return res.status(200).send({
                message: 'No se ha dilegenciado correctamente los campos, por favor intenta de nuevo'
            });
        }

        
    }

};

module.exports = controller;