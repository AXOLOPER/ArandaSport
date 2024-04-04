'use strict'

var jwt = require('jsonwebtoken');
var moment = require('moment');
var secret = 'BaseP_api_rest';

exports.ensureAuth = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'NO TIENE LA CABECERA DE AUTENTICACION' });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'TOKEN HA EXPIRADO' });
        }
    } catch (ex) {
        return res.status(404).send({ message: 'TOKEN NO VALIDO' });
    }

    req.usuario = payload.data;

    next();
}