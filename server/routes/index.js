const miembrosController = require('../controllers').miembros;
const proyectoController = require('../controllers').proyecto;
const crafterController = require('../controllers').crafters;
var md_auth = require('../middlewares/authenticated');

const multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: '../uploads/users'});

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the VW API!',
  }));

  // Api Routes para Miembros
  app.post('/api/register', miembrosController.saveUser); 	//Ruta para registrar a un miembro
  app.post('/api/login', miembrosController.loginUser); 	//Ruta para loguearse (gethash devuelve el token)
  app.post('/api/upload-image-user/:id', [md_auth.ensureAuth, md_upload], miembrosController.uploadImage);  
  app.get('/api/miembros/:idUser', md_auth.ensureAuth, miembrosController.allMiembros); //Ruta para obtener todos los miembros
  app.get('/api/miembro/:idUser', md_auth.ensureAuth, miembrosController.getMiembro);	//Ruta para obtener un miembro
  app.get('/api/probando-controlador', md_auth.ensureAuth,miembrosController.pruebas);  
  app.get('/api/get-image-user/:imageFile', miembrosController.getImageFile);
  app.put('/api/update-user/:id', md_auth.ensureAuth, miembrosController.updateUser);  

  //Api Routes para Proyecto
  app.post('/api/proyecto/:idUser/crear', md_auth.ensureAuth,proyectoController.saveProject);
  app.get('/api/proyectos/:idUser', md_auth.ensureAuth, miembrosController.allProjects);
  
  app.get('/api/proyectos-inscrito/:idUser', md_auth.ensureAuth, proyectoController.getProjectsToMe);
  
  app.get('/api/proyecto/get/:idProject', md_auth.ensureAuth, proyectoController.getProject);
  app.post('/api/proyecto/agregar-miembros', md_auth.ensureAuth, proyectoController.agregaMiembros);
  app.delete('/api/proyecto/eliminar/:idProject', md_auth.ensureAuth, proyectoController.deleteProject);
  app.delete('/api/proyecto/eliminar-miembro/:idProject/:idUser', md_auth.ensureAuth, proyectoController.deleteMiembro);
  app.put('/api/update-project/:idProject', md_auth.ensureAuth, proyectoController.updateProject);   

  //API Routes para Crafters
  app.post('/api/register-crafter', crafterController.saveCrafter);   //Ruta para registrar crafter
  app.get('/api/crafter/:idCrafter', crafterController.getCrafter); //Ruta para obtener un miembro
  app.delete('/api/crafter-eliminar/:idCrafter', crafterController.deleteCrafter);
  app.put('/api/update-crafter/:idCrafter', crafterController.updateCrafter);
  app.get('/api/crafters', crafterController.allCrafters);

};