'use strict'

var mongoose = require('mongoose');
var dbName = require('./config/config');
var app = require('./app');
var port = process.env.PORT || 3999;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/' + dbName.dbName(), { useNewUrlParser: true })
        .then(() => {
            console.log('La conexion de la base de datos se realizo correctamente');

            // Crear el servidor
            app.listen(port, () => {
                console.log('El servidor http://localhost:3999 está funcionando !!!');
            });
        })
        .catch( error => console.log(error));