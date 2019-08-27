'use strict'

var validator = require('validator');
var bcrypt    = require('bcrypt-nodejs');
var jwt       = require('../services/jwt');
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
                        success: false,
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
                                    success: false,
                                    message: 'Error al guardar el usuario'
                                });
                            } 

                            if (!userStored) {
                                return res.status(400).send({
                                    success: false,
                                    message: 'El usuario no se ha guardado'
                                });
                            }

                            return res.status(200).send({
                                success: true,
                                user: userStored
                            });
                        });

                    });

                    
                    
                } else {
                    return res.status(500).send({
                        success: false,
                        message: 'El usuario ya esta registrado en la base de datos'
                    });
                }
            });


            
            
        } else {
            return res.status(200).send({
                success: false,
                message: 'No se ha dilegenciado correctamente los campos, por favor intenta de nuevo'
            });
        }

        
    },

    login: function(req, res) {
        // Recoger los parametros de la petición
        var params = req.body;

        // Validar datos 
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        var validate_password = !validator.isEmpty(params.password);

        if (!validate_email || !validate_password) {
            return res.status(200).send({
                success: false,
                message: 'No se ha dilegenciado correctamente los campos, por favor intenta de nuevo'
            });
        }

        // Buscar usuarios que coincidan con el email
        User.findOne({email: params.email.toLowerCase()}, (err, user) => {

            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Error al intentar identificarte'
                });
            }

            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: 'El usuario no existe'
                });
            }

            // Si lo encunetra Comprobar la contraseña 
            bcrypt.compare(params.password, user.password, (err, check) => {
                if (check) {

                    // Generar token de jwt
                    if (params.gettoken) {
                        // Devolver los datos
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    } 


                    // limpiar el objeto
                    user.password = undefined;

                    
                    return res.status(200).send({
                        success: true,
                        message: 'success',
                        user: user
                    });

                } else {
                    return res.status(404).send({
                        success: false,
                        message: 'El usuario no existe'
                    });
                }
            });

            // Generar token de jwt

            // Devolver datos

        });

    }

};

module.exports = controller;