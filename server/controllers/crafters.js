const Crafters = require('../models').Crafters; 
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
//var fileUpload = require('express-fileupload');

function saveCrafter(req, res){
	var params = req.body;
	var userId = req.params.idUser;	

	if(params.nombre){	
		return Crafters
	      .create({
	        nombre: params.nombre,
		    drivername: params.drivername,
		    color: params.color,
		    numero: params.numero,
		    fotografia: 'null',
		    latitud: params.latitud,
		    longitud: params.longitud,
	      })
	      .then(crafter => res.status(200).send(crafter))
	      .catch(error => res.status(404).send(error));
	}else{
		res.status(404).send({message: 'Introduce un nombre a la crafter'});			
	}
}

function getCrafter(req, res){
	var crafterId = req.params.idCrafter;
	
	return Crafters
	    .findAll({
	      where: {
			id: crafterId,
		  }
	    })
	    .then(crafter => res.status(200).send(crafter))
	    .catch(error => res.status(404).send(error));	
}

function deleteCrafter(req, res){
	var crafterId = req.params.idCrafter;

	return Crafters
    .findById(crafterId)
    .then(crafter => {
      if (!crafter) {        
		return res.status(404).send({message: 'La crafter no existe'});
      }else{
	      return crafter
	        .destroy()
	        .then(() => res.status(200).send({message: 'CRafter eliminada'}))
	        .catch(error => res.status(404).send(error));
	  }
    })
    .catch(error => res.status(404).send(error));
}

function updateCrafter(req, res){
	var crafterId = req.params.idCrafter;	
	var params = req.body;
				
	return Crafters
	    .findById(crafterId)
	    .then(crafter => {
	      if (!crafter) {
	        return res.status(404).send({message: 'La crafter no existe',});
	      }
	      else{
		      return crafter
		        .update({	
		        	nombre: params.nombre,
				    drivername: params.drivername,
				    color: params.color,
				    numero: params.numero,
				    latitud: params.latitud,
				    longitud: params.longitud,    				
		        })
		        .then(() => {
		        	res.status(200).send(crafter)			        	  
		        })  // Send back the updated user
		        .catch((error) => res.status(400).send({message: 'Error en Update'}));
		  }
	    })
	    .catch((error) => res.status(400).send(error));
}

function allCrafters(req, res){

	return Crafters
		.findAll()
		.then(crafter => res.status(200).send(crafter))
		.catch(error => res.status(400).send(error));
}

module.exports = {
	saveCrafter,
	getCrafter,
	deleteCrafter,
	updateCrafter,
	allCrafters,
};