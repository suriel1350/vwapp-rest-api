'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_proyecto';

exports.createToken = function(user){
	var payload = {
		sub: user.id,
		matricula: user.matricula,
		nombre: user.nombre,
		role: user.role,
		iat: moment().unix(),
		exp: moment().add(600, "seconds").unix(),
	};

	return jwt.encode(payload, secret);
};