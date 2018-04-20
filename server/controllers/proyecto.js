const Proyectos = require('../models').Proyectos; 
const Miembros = require('../models').Miembros; 
const DetalleProyectos = require('../models').DetalleProyectos;
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
//var fileUpload = require('express-fileupload');

function saveProject(req, res){
	var params = req.body;
	var userId = req.params.idUser;	

	if(params.nombre){
		Proyectos.findOne({
			where: {
				nombre: params.nombre.toUpperCase(),
			}
		})
		.then(proyect => {
			if(!proyect){
				//Aqui ya podemos agregar un Proyectos no importan si todos los campos no estan llenos
				return Proyectos
			      .create({
			        nombre: params.nombre.toUpperCase(),
			        idmiembros: userId,			    
			        vision: params.vision,
    				background: params.background,
    				riesgos: params.riesgos,
    				alcance: params.alcance,
    				fechainicio: params.fechainicio,
    				fechafinal: params.fechafinal,
    				role: 'TSCRUM_MASTER',
			      })
			      .then(proyect => res.status(201).send(proyect))
			      .catch(error => res.status(400).send(error));
			}
			else
			{
				res.status(404).send({message: 'El nombre del proyecto ya existe :('});	
			}
		})
		.catch(error => res.status(400).send(error));
	}else{
		res.status(404).send({message: 'Introduce un nombre a tu proyecto'});			
	}
}

function agregaMiembros(req, res){
	var params = req.body;
	var miembroId = req.params.idmiembro;	

	if(params.idmiembro){
		Miembros.findOne({
			where: {
				id: params.idmiembro,
			}
		})
		.then(miembro => {
			if(!miembro){				
				res.status(200).send({message: 'El id del miembro no existe :('});					
			}
			else
			{
				if(params.idproyecto){
					Proyectos.findOne({
						where: {
							id: params.idproyecto,
						}
					})
					.then(proyecto => {
						if(!proyecto){				
							res.status(200).send({message: 'El id del proyecto no existe :('});					
						}
						else
						{
							DetalleProyectos.findOne({
								where: {
									idmiembros: params.idmiembro,
									idproyectos: params.idproyecto,
								}
							})
							.then(respuesta => {
								if(!respuesta){
									//Aqui ya agregamos miembros
									return DetalleProyectos
								      .create({						        
								        idmiembros: params.idmiembro,
								        idproyectos: params.idproyecto,
								        role: params.role || 'desarrollador',
								      })
								      .then(detalles => res.status(201).send(detalles))
								      .catch(error => res.status(400).send(error));									
								}else{
									res.status(404).send({message: 'No puedes agregar a un miembro dos veces'});
								}
							})
							.catch(error => res.status(400).send(error));
						}
					})
					.catch(error => res.status(400).send(error));
				}else{
					res.status(200).send({message: 'Agrega el id de un proyecto'});
				}
			}
		})
		.catch(error => res.status(400).send(error));
	}else{
		res.status(200).send({message: 'Agrega el id de un integrante'});			
	}
}

function getProject(req, res){
	var projectId = req.params.idProject;
	
	return Proyectos
	    .findAll({
	      include: [{
	        model: DetalleProyectos,
	        as: 'idproyectos',
	      }],
	      where: {
			id: projectId,
		  }
	    })
	    .then(projects => res.status(200).send(projects))
	    .catch(error => res.status(400).send(error));	
}

function deleteProject(req, res){
	var projectId = req.params.idProject;

	return Proyectos
    .findById(projectId)
    .then(project => {
      if (!project) {        
		return res.status(404).send({message: 'El proyecto no existe'});
      }else{
	      return project
	        .destroy()
	        .then(() => res.status(200).send({message: 'Proyecto eliminado'}))
	        .catch(error => res.status(400).send(error));
	  }
    })
    .catch(error => res.status(400).send(error));
}

function deleteMiembro(req, res){
	var userId = req.params.idUser;
	var projectId = req.params.idProject;

    return DetalleProyectos
    .find({
        where: {
          idproyectos: projectId,
          idmiembros: userId,
        },
      })
    .then(miembroPro => {
      if (!miembroPro) {
       return res.status(404).send({message: 'El miembro no existe'});
      }else{
	      return miembroPro
	        .destroy()
	        .then(() => res.status(200).send({message: 'Miembro eliminado'}))	        
	        .catch(error => res.status(400).send(error));
	  }
    })
    .catch(error => res.status(400).send(error));
}

function updateProject(req, res){
	var projectId = req.params.idProject;	
	var params = req.body;

	if(params.nombre){		
		Proyectos.findOne({
			where: {
				nombre: params.nombre.toUpperCase(),
			}
		})
		.then(project => {
			if(!project){
				
				return Proyectos
				    .findById(projectId)
				    .then(project => {
				      if (!project) {
				        return res.status(404).send({message: 'El proyecto no existe',});
				      }
				      else{
					      return project
					        .update({	
					        	nombre: params.nombre.toUpperCase(),			        
						        vision: params.vision,
			    				background: params.background,
			    				riesgos: params.riesgos,
			    				alcance: params.alcance,
			    				fechainicio: params.fechainicio,
			    				fechafinal: params.fechafinal,	    				
					        })
					        .then(() => {
					        	res.status(200).send(project)			        	  
					        })  // Send back the updated user
					        .catch((error) => res.status(400).send({message: 'Error en Update'}));
					  }
				    })
				    .catch((error) => res.status(400).send(error));

			}else{
				res.status(404).send({message: 'El nombre del proyecto ya existe'});
			}
		})
		.catch(error => res.status(400).send(error));
	}else{
		//Actualizar el proyecto
		return Proyectos
		    .findById(projectId)
		    .then(project => {
		      if (!project) {
		        return res.status(404).send({message: 'El proyecto no existe',});
		      }
		      else{
			      return project
			        .update({				        
				        vision: params.vision,
	    				background: params.background,
	    				riesgos: params.riesgos,
	    				alcance: params.alcance,
	    				fechainicio: params.fechainicio,
	    				fechafinal: params.fechafinal,	    				
			        })
			        .then(() => {
			        	res.status(200).send(project)			        	  
			        })  // Send back the updated user
			        .catch((error) => res.status(400).send({message: 'Error en Update'}));
			  }
		    })
		    .catch((error) => res.status(400).send(error));
	}
}

function getProjectsToMe(req, res){
	var userId = req.params.idUser;
	
	return DetalleProyectos
	    .findAll({
	      include: [{
	        model: Proyectos,
	        attributes: ['nombre'],
	        
	        include: [{
		        model: Miembros,
	        	attributes: ['nombre'],
		     }],
	      }],
	      where: {
			idmiembros: userId,
		  }
	    })
	    .then(myprojects => res.status(200).send(myprojects))
	    .catch(error => res.status(400).send(error));	
}

module.exports = {
	saveProject,
	agregaMiembros,
	getProject,
	deleteProject,
	deleteMiembro,
	updateProject,
	getProjectsToMe,
};